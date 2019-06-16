<template>
  <div>
    <div v-for="(category, i) in core.skills" :key="i">
      <div>
        <h3>{{category.name}}</h3>
        <button v-on:click="() => removeCategory(i)">Supprimer la catégorie</button>
      </div>
      <div v-for="(skill, j) in category.list" :key="j">
        {{skill.name}}
        <button v-on:click="() => removeSkill(i, j)">Supprimer la compétence</button>
      </div>
      <div>
        <button v-on:click="() => addSkill(i)">Ajouter compétence ici</button>
      </div>
    </div>
    <div>
      <input v-model="field" placeholder="Nom de catégorie/compétence">
      <button v-on:click="addCategory">Ajouter la catégorie</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "skills-page",
  props: {
    dispatch: {
      type: Function,
      required: true
    },
    core: {
      type: Object,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  data: () => ({
    field: ""
  }),
  computed: {},
  methods: {
    test() {
      console.log("mdr");
      this.dispatch({ type: "TEST" });
    },
    removeSkill(key, subkey) {
      //delete this.core.skills[key].list[subkey];
      this.dispatch({ type: "REMOVE_SKILL", key, subkey });
    },
    addSkill(key) {
      this.dispatch({ type: "ADD_SKILL", key, skill: { name: this.field } });
      this.newSkill = "";
    },
    removeCategory(key) {
      this.dispatch({ type: "REMOVE_CATEGORY", key });
    },
    addCategory() {
      this.dispatch({
        type: "ADD_CATEGORY",
        category: { name: this.field }
      });
      this.newCategory = "";
    }
  }
};
</script>

<style>
</style>
