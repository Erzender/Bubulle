<template>
  <div>
    <h1>Liste d'élèves</h1>
    <h3>Filtres :</h3>
    <div v-for="(filter, k) in filters" :key="'filter' + k">
      {{filter}}
      <button v-on:click="() => removeFilter(k)">Enlever</button>
    </div>
    <select v-model="filterfield">
      <option v-for="(filter, i) in tags" :key="'tag' + i" v-bind:value="filter">{{filter}}</option>
    </select>
    <button v-on:click="addFilter">Ajouter un filtre</button>
    <h3>Liste :</h3>
    <div v-for="(pupil, j) in pupils" :key="j">
      {{pupil.lastname}} {{pupil.firstname}} {{pupil.tags}}
      <button
        v-on:click="() => selectPupil(pupil.id)"
      >Sélectionner</button>
    </div>
    <h1>Elève sélectionné</h1>
    <div v-if="selectedPupil !== null">
      {{pupilInfo.lastname}} {{pupilInfo.firstname}} {{pupilInfo.tags}}
      <div v-for="cat in skillList" :key="'cat' + cat.num">
        <h3>{{cat.name}}</h3>
        <div v-for="(skill, key) in cat.skills" :key="'skill'+key">
          {{skill.name}}
          <input
            type="checkbox"
            v-model="skill.activated"
            v-on:click="() => checkSkill(cat.num, skill.num)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import convert from "xml-js";

export default {
  name: "bulletins-page",
  props: {
    dispatch: {
      type: Function,
      required: true
    },
    core: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    filterfield: [],
    filters: [],
    selectedPupil: null
  }),
  computed: {
    skillList() {
      return this.core.skills.map(category => ({
        num: category.num,
        name: category.name,
        skills: category.list.map(elem => ({
          num: elem.num,
          name: elem.name,
          activated: this.pupilInfo.skills.find(
            skill => skill.cat === category.num && skill.num === elem.num
          )
        }))
      }));
    },
    pupilInfo() {
      let pupil = this.pupils.find(pupil => pupil.id === this.selectedPupil);
      return {
        firstname: pupil.firstname,
        lastname: pupil.lastname,
        tags: pupil.tags,
        skills: pupil.skills
      };
    },
    tags() {
      let tags = [];
      this.core.pupils.forEach(element => {
        element.tags.forEach(i => {
          if (
            !tags.find(tag => tag === i) &&
            !this.filters.find(tag => tag === i)
          ) {
            tags.push(i);
          }
        });
      });
      return tags;
    },
    pupils() {
      return this.core.pupils
        .map((pupil, id) => ({ id, ...pupil }))
        .filter(elem => {
          let matchingTags = elem.tags.map(
            tag =>
              !!this.filters.find(e => e === tag) || this.filters.length === 0
          );
          return !!matchingTags.find(e => e === true);
        })
        .sort((a, b) => a.lastname > b.lastname);
    }
  },
  methods: {
    checkSkill(cat, num) {
      this.dispatch({
        type: "TOGGLE_PUPIL_SKILL",
        pupil: this.selectedPupil,
        category: cat,
        skill: num
      });
    },
    selectPupil(id) {
      this.selectedPupil = id;
    },
    removeFilter(key) {
      this.filters.splice(key, 1);
    },
    addFilter() {
      this.filters = this.filters.concat(this.filterfield);
      this.filterfield = [];
    }
  }
};
</script>

<style>
</style>
