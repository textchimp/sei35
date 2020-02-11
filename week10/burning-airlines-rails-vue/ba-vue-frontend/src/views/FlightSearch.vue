<template lang="html">
<div>
  <h3>Flight Search</h3>

  <div class="searchForm">

      <!-- <input type="text" v-model="origin"> -->

      <label for="">Origin:</label>
      <select v-model="origin">
        <option value="">Please select:</option>
        <option>SYD</option>
        <option>SFO</option>
        <option>SIN</option>
        <option>JFK</option>
      </select>
      &nbsp; &nbsp;
      <label for="">Destination:</label>
      <select v-model="destination">
        <option value="">Please select:</option>
        <option>SYD</option>
        <option>SFO</option>
        <option>SIN</option>
        <option>JFK</option>
      </select>

      &nbsp; &nbsp;

      <button @click="submitSearch">Search Flights</button>

  </div>
</div>
</template>

<script>

// FUCK YOU REACT!
// constructor(props){
//   super(props);
//
//   this.handleSubmit = this.handleSubmit.bind(this);
// }

export default {
  name: 'FlightSearch',
  // The state for this component:
  data(){
    return {
      origin: 'SYD',
      destination: 'SIN'
    };
  },
  methods: {
    submitSearch(){
      console.log('Submit!');
      this.$router.push({
        name: 'SearchResults',
        params: {
          origin: this.origin,
          destination: this.destination,
        }
      });

    }
  }
}
</script>

<style lang="css" scoped>
</style>
