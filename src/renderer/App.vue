<template>
  <div id="app">
    <landing-page v-if="route === 'landing'" v-bind:core="core" :dispatch="dispatch"></landing-page>
    <skills-page v-if="route === 'skills'" v-bind:core="core" :dispatch="dispatch"></skills-page>
    <pupils-page v-if="route === 'pupils'" v-bind:core="core" :dispatch="dispatch"></pupils-page>
    <bulletins-page v-if="route === 'bulletins'" v-bind:core="core" :dispatch="dispatch"></bulletins-page>
  </div>
</template>

<script>
import LandingPage from "@/LandingPage";
import SkillsPage from "@/SkillsPage";
import PupilsPage from "@/PupilsPage";
import BulletinsPage from "@/BulletinsPage";

export default {
  name: "bubulle",
  data: () => ({
    route: "landing",
    core: {
      bulletins: {},
      pupils: {},
      skills: {}
    }
  }),
  components: {
    LandingPage,
    SkillsPage,
    PupilsPage,
    BulletinsPage
  },
  methods: {
    dispatch(action) {
      switch (action.type) {
        case "CHANGE_PAGE":
          this.route = action.page;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
/* CSS */
</style>
