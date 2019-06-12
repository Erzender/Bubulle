<template>
  <div>
    <button v-on:click="buttonSkills">Editeur de compétences</button>
    <button v-on:click="buttonPupils">Listes d'élèves</button>
    <button v-on:click="buttonBulletins">Bulletins</button>
  </div>
</template>

<script>
export default {
  name: "landing-page",
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
  data: () => ({ hello: "yoy" }),
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    buttonSkills() {
      this.dispatch({ type: "CHANGE_PAGE", page: "skills" });
    },
    buttonPupils() {
      this.dispatch({ type: "CHANGE_PAGE", page: "pupils" });
    },
    buttonBulletins() {
      this.dispatch({ type: "CHANGE_PAGE", page: "bulletins" });
    }
  }
};
</script>

<style>
</style>
