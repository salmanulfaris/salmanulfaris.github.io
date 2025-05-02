<template>
  <div
      class="flex h-screen w-full bg-background"
  >
    <div class="flex w-full gap-3 z-[100]">
      <div class="basis-1/3 px-16">
        <div class="pt-24">
          <!-- Profile Section -->
          <div class="w-full">
            <div
                class="w-[180px] md:ml-auto h-[180px] border border-slate-200 rounded-full bg-[url(/img/profile-picture-salmanulfaris.jpg)] bg-contain ">
            </div>
            <div class="mt-16">
              <ul>
                <li class="hover:translate-x-1 ease-in hover:cursor-pointer my-3 transition-all">- Profile</li>
                <li class="hover:translate-x-1 ease-in hover:cursor-pointer my-3 transition-all">- Skills</li>
                <li class="hover:translate-x-1 ease-in hover:cursor-pointer my-3 transition-all">- Education</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-2/3 overflow-y-scroll pb-32">
        <div class="px-24 pt-24">
          <h1>
            <LetterPullup
                words="Salmanul Faris"
                :delay="0.05"
                class="text-7xl text-wrap font-black dark:text-white"
            />
          </h1>
          <span class="text-gray-200 text-lg mt-4 ">Software Engineer | Data Scientist</span>
          <div class="mt-4">
            <div v-for="social in socials"
                 class="border border-slate-200 hover:cursor-pointer inline-block mr-2 text-sm px-4 py-1 bg-gray-900 rounded-full">
              <a :href="social.link" target="_blank">

                <Icon class="inline-block mr-1" :icon="social.icon"/>
                {{ social.title }}
              </a>
            </div>
          </div>

          <p class="font-medium mt-10 leading-6">
            {{ bio }}
          </p>

          <div class="mt-20 ">
            <h3 class="font-black text-4xl tracking-tight">Skills</h3>
            <div class="ml-1">

              <div v-for="skill_set in skills" class="mb-5">
                <p class="text-slate-200 my-2">{{ skill_set.name }}</p>
                <div v-for="sk in skill_set.skills"
                     :class="'inline-block font-medium mr-2 px-3 py-0.5 border border-slate-500 text-xs rounded-full  '+'bg-'+skill_set.color+'-400/10'"
                >

                  {{ sk }}
                </div>
              </div>
            </div>

          </div>


          <div class="mt-20">
            <h3 class="font-black text-4xl tracking-tight">Education</h3>
            <div v-for="education in educations" class="mt-5">
              <div class="flex justify-between mt-2">
                <p class="text-slate-400 text-sm pb-0">{{ education.university }}</p>
                <span class="text-slate-200">
                  {{ education.year }}
                </span>
              </div>
              <p class="text-lg font-medium">{{ education.subject }}</p>
            </div>
          </div>

          <!--          <div class="mt-20">-->
          <!--            <h3 class="font-black text-4xl tracking-tight">Projects</h3>-->
          <!--          </div>-->

        </div>
      </div>

    </div>
    <ParticlesBg
        class="absolute inset-0"
        :quantity="100"
        :ease="100"
        :color="isDark ? '#FFF' : '#000'"
        :staticity="10"
        refresh
    />
  </div>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {computed} from "vue";
import {useColorMode} from "@vueuse/core";
import {ParticlesBg} from "@/components/ui/particles-bg";
import {LetterPullup} from "@/components/ui/letter-pullup";

// bg-amber-400/10
// bg-green-400/10
// bg-red-400/10
// bg-cyan-400/10

const skills = [
  {
    'color': 'amber',
    'name': 'Languages',
    'skills': ['Java', 'Python', 'Javascript', 'PHP', 'Bash', 'SQL']
  },
  {
    'color': 'green',
    'name': 'Tools & Frameworks',
    'skills': ['Laravel', 'Vue', 'Flask', 'Langchain', 'Scikit-Learn']
  },
  {
    'color': 'red',
    'name': 'Platforms',
    'skills': ['AWS', 'Digitalocean', 'Azure']
  },
  {
    'color': 'cyan',
    'name': 'Database',
    'skills': ['MySQL', 'SQLite', 'Firestore', 'MongoDB']
  }
]

const socials = [
  {
    'title': 'Linkedin',
    'link': 'https://www.linkedin.com/in/salmanulfarisk',
    'icon': 'line-md:linkedin'
  },
  {
    'title': 'Twitter',
    'link': 'https://x.com/salman_faris_1',
    'icon': 'line-md:twitter'
  }
]


const educations = [
  {
    'university': "Indian Institute of Technology, Madras, India.",
    'subject': 'BS in Data Science and Application',
    'year': '2021 - Present',
    'place': ''
  },
  {
    'university': "Indian Institute of Technology, Madras, India.",
    'subject': 'Diploma in Data Science',
    'year': '2023',
    'place': ''
  },
  {
    'university': "Indian Institute of Technology, Madras, India.",
    'subject': 'Diploma in Programming',
    'year': '2024',
    'place': ''
  },
  {
    'university': "M-DIT Polytechnic College, Kerala, India",
    'subject': 'Diploma in Electronics and Communication',
    'year': '2017-2020',
    'place': ''
  },

]

const bio = "I'm Salmanul Faris — a Software Engineer and Data Scientist with 5+ years of experience building full-stack web apps and solving real-world problems with data. I work with tools like Laravel, Vue, Python, and Langchain, and I’m currently pursuing the IIT Madras BS degree in Data Science. I enjoy crafting scalable solutions that merge solid engineering with data-driven insights.";

const isDark = computed(() => useColorMode().value == "dark");
</script>