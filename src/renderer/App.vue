<template>
  <div id="app">
    <button v-if="route !== 'landing'" v-on:click="dashboard">Retour au tableau de bord</button>
    <landing-page v-if="route === 'landing'" :core="core" :dispatch="dispatch"></landing-page>
    <skills-page
      v-if="route === 'skills'"
      v-bind:route="hello"
      v-bind:core="core"
      :dispatch="dispatch"
    ></skills-page>
    <pupils-page v-if="route === 'pupils'" :core="core" :dispatch="dispatch"></pupils-page>
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
    hello: "bonjour",
    route: "landing",
    core: {
      pupils: [
        {
          firstname: "Jacques",
          lastname: "Fouf",
          tags: ["2018 petits"],
          skills: [{ cat: "1", num: "a" }]
        },
        {
          firstname: "Bob",
          lastname: "Lennon",
          tags: ["2018 petits"],
          skills: []
        }
      ],
      skills: [{ num: "1", name: "Test", list: [{ num: "a", name: "Skill" }] }]
    }
  }),
  components: {
    LandingPage,
    SkillsPage,
    PupilsPage,
    BulletinsPage
  },
  methods: {
    dashboard() {
      this.dispatch({ type: "CHANGE_PAGE", page: "landing" });
    },
    dispatch(action) {
      console.log(action);
      switch (action.type) {
        case "CHANGE_PAGE":
          return (this.route = action.page);
        case "REMOVE_SKILL":
          return this.core.skills[action.key].list.splice(action.subkey, 1);
        case "ADD_SKILL":
          return this.core.skills[action.key].list.push(action.skill);
        case "REMOVE_CATEGORY":
          return this.core.skills.splice(action.key, 1);
        case "ADD_CATEGORY":
          return this.core.skills.push({ ...action.category, list: [] });
        case "ADD_PUPIL":
          return this.core.pupils.push({
            firstname: action.pupil.firstname,
            lastname: action.pupil.lastname,
            tags: action.pupil.tags,
            skills: []
          });
        case "EDIT_PUPIL":
          let skills = this.core.pupils[action.pupil.id];
          this.core.pupils.splice(action.pupil.id, 1);
          return this.core.pupils.push({
            firstname: action.pupil.firstname,
            lastname: action.pupil.lastname,
            tags: action.pupil.tags,
            skills: skills
          });
        case "REMOVE_PUPIL":
          return this.core.pupils.splice(action.id, 1);
        case "TOGGLE_PUPIL_SKILL":
          let inList = this.core.pupils[action.pupil].skills.findIndex(
            skill => skill.cat === action.category && skill.num === action.skill
          );
          if (inList >= 0) {
            this.core.pupils[action.pupil].skills.splice(inList, 1);
          } else {
            this.core.pupils[action.pupil].skills.push({
              cat: action.category,
              num: action.skill
            });
          }
          return;
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
