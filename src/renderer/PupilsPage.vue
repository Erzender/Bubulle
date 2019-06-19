<template>
  <div>
    <h1>Elèves</h1>
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
        v-on:click="() => editPupil(pupil.id)"
      >Modifier</button>
      <button>Supprimer</button>
    </div>
    <h1>{{inputTitle}}</h1>
    <input v-model="input.lastname" placeholder="Nom">
    <input v-model="input.firstname" placeholder="Prénom">
    <span v-for="tag in input.tags" :key="tag">
      {{tag}}
      <button v-on:click="() => removePupilTag(tag)">X</button>
    </span>
    <input v-model="input.newtag" placeholder="Ajouter classe">
    <button v-on:click="addPupilTag">+</button>
    <button>{{inputTitle}}</button>
    <button v-on:click="inputUndo">Annuler</button>
  </div>
</template>

<script>
export default {
  name: "pupils-page",
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
    input: { firstname: "", lastname: "", tags: [], newtag: "" },
    editing: -1
  }),
  computed: {
    inputTitle() {
      return this.editing >= 0 ? "Modifier élève" : "Ajouter élève";
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
    validate() {
      if (!this.editing) {
        this.dispatch({
          type: "ADD_PUPIL",
          pupil: { ...this.input, newtag: undefined }
        });
        this.input = { firstname: "", lastname: "", tags: [], newtag: "" };
      }
    },
    addPupilTag() {
      this.input.tags.push(this.input.newtag);
      this.input.newtag = "";
    },
    removePupilTag(tag) {
      this.input.tags.splice(
        this.input.tags.findIndex(elem => elem === tag),
        1
      );
    },
    editPupil(id) {
      this.editing = id;
      this.input = {
        firstname: this.core.pupils[id].firstname,
        lastname: this.core.pupils[id].lastname,
        tags: this.core.pupils[id].tags.slice(),
        newtag: ""
      };
    },
    removeFilter(key) {
      this.filters.splice(key, 1);
    },
    addFilter() {
      this.filters = this.filters.concat(this.filterfield);
      this.filterfield = [];
    },
    inputUndo() {
      this.input = { firstname: "", lastname: "", tags: [], newtag: "" };
      this.editing = -1;
    }
  }
};
</script>

<style>
</style>
