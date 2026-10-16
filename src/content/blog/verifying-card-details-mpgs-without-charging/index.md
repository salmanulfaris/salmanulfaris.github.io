---
title: "Verify card information without charging any amount in Mastercard payment gateway"
description: "How to verify a customer's card with MPGS Hosted Checkout without charging any money, using the VERIFY operation."
date: 2026-10-16
cover: ./cover.png
tags: [mpgs, card verification, payment gateway]
coverAlt: "MPGS card verification"
---

There is a way to verify card information without charging any amount from the card, and it works with 3DS authentication.

It supports tokenization too.

## Use cases

- Verifying card information or the user's identity.
- Tokenizing the card for future use.
- Saving authentication data.

## How it works with Hosted Checkout

When you create the Hosted Checkout session, set `interaction.operation` to `VERIFY`. Then MPGS understands that this transaction will not have any money movement.

So, let's go step by step.

### Step 1: Create the checkout session

```api
POST https://{gateway-host}/api/rest/version/100/merchant/{merchantId}/session
Authorization: Basic base64(merchant.{merchantId}:{apiPassword})
Content-Type: application/json

{
    "apiOperation": "INITIATE_CHECKOUT",
    "interaction": {
        "operation": "VERIFY",
        "merchant": {
            "name": "<merchant_name>"
        },
        "returnUrl": "https://www.your-site.com/return"
    },
    "order": {
        "currency": "USD",
        "amount": "0",
        "id": "<order_ID>",
        "description": "<description_of_order>"
    }
}
```

Here, make sure `order.amount` is zero, because we are not charging any money.
You can add more information to the order if you need to.

`{gateway-host}` depends on your region, for example `na.gateway.mastercard.com`, `eu-gateway.mastercard.com` or `ap-gateway.mastercard.com`. Your payment provider will tell you which one to use.

All API calls use Basic authentication. The username is `merchant.{merchantId}` and the password is your API password.

The response gives you a `session.id` and a `successIndicator`:

```json title="Response"
{
    "merchant": "<merchant_ID>",
    "result": "SUCCESS",
    "session": {
        "id": "SESSION0002776555072I12345678",
        "updateStatus": "SUCCESS",
        "version": "a1b2c3d4e5"
    },
    "successIndicator": "f1e2d3c4b5a69788"
}
```

Save the `successIndicator`; you will need it in step 3.

### Step 2: Show the payment page

Load `checkout.min.js` from your gateway and open the payment page with the session ID:

```html
<script src="https://{gateway-host}/static/checkout/checkout.min.js"></script>
<script>
    Checkout.configure({
        session: { id: '<session_ID>' }
    });

    Checkout.showPaymentPage();
</script>
```

The customer enters their card details and completes 3DS authentication if it is needed. No money is charged.

### Step 3: Check the result

After the customer finishes, MPGS redirects them to your `returnUrl` with a `resultIndicator` in the query string.
If it matches the `successIndicator` you saved in step 1, the verification was successful.

### Step 4: Fetch the order details

After successful verification, fetch the order details:

```api
GET https://{gateway-host}/api/rest/version/100/merchant/{merchantId}/order/{orderId}
Authorization: Basic base64(merchant.{merchantId}:{apiPassword})
```

In the response, `status` will be `VERIFIED`.
That means the card details were verified successfully, and no payment was made.

```json title="Response (shortened)"
{
    "id": "<order_ID>",
    "amount": 0,
    "currency": "USD",
    "result": "SUCCESS",
    "status": "VERIFIED"
}
```
