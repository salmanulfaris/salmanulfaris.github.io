// Markdown extensions for API documentation in blog posts.
//
// 1. ```api blocks, written like a raw HTTP request:
//
//      ```api
//      POST https://{gateway-host}/api/rest/version/100/merchant/{merchantId}/session
//      Content-Type: application/json
//
//      { "apiOperation": "INITIATE_CHECKOUT" }
//      ```
//
//    The first line is the method and URL, then optional headers, then a blank line and an
//    optional body. Renders as a card with a method badge, the URL (base URL muted, {params}
//    highlighted, copy button), the headers, and the body highlighted as JSON.
//
// 2. title="..." on any code block, e.g. ```json title="Response", adds a caption bar.

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Wrap {placeholders} so they can be styled
const withParams = (s) => escape(s).replace(/\{[^}]+\}/g, (m) => `<span class="api-param">${m}</span>`)

function renderUrl(url) {
  const match = url.match(/^([a-z]+:\/\/[^/]+)(.*)$/i)
  const base = match ? match[1] : ''
  const path = match ? match[2] : url
  return (
    (base ? `<span class="api-base">${withParams(base)}</span>` : '') +
    // <wbr> lets long URLs wrap after a slash instead of mid-word
    `<span class="api-path">${(path || '/').split('/').map(withParams).join('/<wbr>')}</span>`
  )
}

function apiBlock(node) {
  const lines = node.value.replace(/\r/g, '').split('\n')
  const [method, ...rest] = (lines.shift() || '').trim().split(/\s+/)
  const url = rest.join(' ')
  const verb = method.toUpperCase()

  const headers = []
  while (lines.length && lines[0].trim() !== '') {
    const line = lines.shift()
    const i = line.indexOf(':')
    if (i > 0) headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()])
  }
  const body = lines.join('\n').trim()

  const methodClass = METHODS.includes(verb) ? `api-method-${verb.toLowerCase()}` : ''
  let open =
    `<div class="api-block not-prose">` +
    `<div class="api-request">` +
    `<span class="api-method ${methodClass}">${escape(verb)}</span>` +
    `<code class="api-url">${renderUrl(url)}</code>` +
    `<button type="button" class="api-copy" data-copy="${escape(url)}" aria-label="Copy URL">Copy</button>` +
    `</div>`

  if (headers.length) {
    open +=
      `<dl class="api-headers">` +
      headers.map(([k, v]) => `<dt>${escape(k)}</dt><dd>${withParams(v)}</dd>`).join('') +
      `</dl>`
  }

  if (!body) return [{ type: 'html', value: open + `</div>` }]

  const lang = /^[[{]/.test(body) ? 'json' : 'text'
  return [
    { type: 'html', value: open + `<div class="api-body-label">Request body</div>` },
    { type: 'code', lang, meta: null, value: body },
    { type: 'html', value: `</div>` },
  ]
}

function titledBlock(node, title) {
  return [
    { type: 'html', value: `<div class="code-titled"><div class="code-title">${escape(title)}</div>` },
    { ...node, meta: node.meta.replace(/title="[^"]*"/, '').trim() || null },
    { type: 'html', value: `</div>` },
  ]
}

export default function remarkApiBlocks() {
  return (tree) => {
    const walk = (parent) => {
      if (!parent.children) return
      for (let i = 0; i < parent.children.length; i++) {
        const node = parent.children[i]
        let replacement = null

        if (node.type === 'code' && node.lang === 'api') {
          replacement = apiBlock(node)
        } else if (node.type === 'code' && node.meta) {
          const title = node.meta.match(/title="([^"]*)"/)
          if (title) replacement = titledBlock(node, title[1])
        }

        if (replacement) {
          parent.children.splice(i, 1, ...replacement)
          i += replacement.length - 1
        } else {
          walk(node)
        }
      }
    }
    walk(tree)
  }
}
