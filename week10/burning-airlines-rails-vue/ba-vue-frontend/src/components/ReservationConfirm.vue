<template>
<div class="selection">
  <h4>Your Seat Selection:</h4>
  <div class="seat">
    {{ selectedSeat.row }}{{ selectedSeat.col | toSeatLetter }}
  </div>

  <button class="confirm" @click="confirmSeat">
    Confirm Seat
  </button>

</div>
</template>

<script>
// import axios from 'axios';
import ajax from '@/lib/ajax';

export default {
  name: 'ReservationConfirm',
  props: ['selectedSeat', 'flightID', 'userID'],
  filters: {
    toSeatLetter( num ){
      return String.fromCharCode( 64 + num );
    }
  },

  methods: {
    confirmSeat(){
      console.log('CONFIRM!');
      // axios.post('http://localhost:3000/reservations', {
      //     row: this.selectedSeat.row,
      //     col: this.selectedSeat.col,
      //     user_id: this.userID, // DO NOT DO THIS! Use current_user or similar on the backend
      //     flight_id: this.flightID
      //   })
      ajax.createReservation(this.selectedSeat.row, this.selectedSeat.col, this.flightID, this.userID)
        .then(  res => {
          console.log('response', res);
          this.$emit( 'seatConfirmed', res.data );
        })
        .catch( err => console.warn('POST reservation error', err) );

    }
  }
}
</script>

<style lang="css" scoped>
.seat {
  font-size: 16pt;
  font-weight: bold;
  padding-bottom: 10px;
}
.confirm {
  width: 120px;
  height: 20px;
  max-width: 80%;
  margin: 0 auto 20px;
  background-color: green;
  color: white;
  border-radius: 10px;
  padding: 14px;
  line-height: 20px;
  border: 1px solid grey;
  box-shadow: 5px 5px 10px grey;
  cursor: pointer;
}
.confirm:hover{
  font-weight: bold;
  box-shadow: 10px 10px 20px grey;
}
</style>
