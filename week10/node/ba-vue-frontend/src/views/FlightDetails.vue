<template>
<div>

  <h1>Flight {{ flight.flight_number }}</h1>

  <div class="confirmationMessage" v-if="showConfirmationMessage.row">
    Your reservation was booked successfully.<br>
    Your seat is {{ showConfirmationMessage.row }}{{ showConfirmationMessage.col | toSeatLetter }}
  </div>

  <ReservationConfirm
    v-if="seat.row && seat.col"
    :selectedSeat="seat"
    :flightID="id"
    :userID="userID"
    @seatConfirmed="seatBooked"
  />

  <div class="seating" v-if="flight.airplane">

    <div class="planeRow" v-for="row in flight.airplane.rows" :key="row">
      {{ row }}
      <div class="seat"
        :class="[ seatStatus(row, col), selectedSeat(row, col) ]"
        @click="selectSeat(row, col)"
        v-for="col in flight.airplane.cols">
        {{ col | toSeatLetter }}
      </div>  <!-- seat -->
      {{ row }}
    </div><!-- planeRow -->

  </div><!-- seating -->


</div>
</template>

<script>
// import axios from 'axios';
import ajax from '@/lib/ajax';

import ReservationConfirm from '@/components/ReservationConfirm.vue';

const FAKE_CURRENT_USER_ID = 16; // TODO: implement login system with knock/jwt

export default {
  name: 'FlightDetails',
  props: ['id'],  // comes from the router,
  components: {
    ReservationConfirm  // FlightDetails will render this one as a child
  },
  data(){
    return {
      flight: {},
      reservations: {},
      user_reservations: {},
      showConfirmationMessage: {},
      seat: {
        row: 0,
        col: 0
      },
      userID: FAKE_CURRENT_USER_ID
    };
  },

  mounted(){
    this.getFlightDetails(); // Load initial data
    // window.setInterval( this.getFlightDetails, 2000 ); // Poll the server to show live reservation updates
  },

  methods: {

    getFlightDetails(){
      // Load the details for this flight ID
      // axios.get(`http://localhost:3000/flights/${ this.id }`)
      ajax.getFlightDetails( this.id )
        .then( res => {
          this.flight = res.data.flight;
          this.reservations = res.data.reservations;
          this.user_reservations = res.data.user_reservations;
        })
        .catch( err => console.warn('Error loading flight', err) );

    },

    seatBooked( reservation ){
      console.log('new reservation', reservation);

      // Add to the list of reservations for this
      // flight in state, so it will appear as
      // ours immediately in the seating
      // diagram

      // this.flight.reservations.push( reservation );
      this.user_reservations[`${reservation.row}-${reservation.col}`] = 1;

      // Stop the ReservationConfirm component
      // from appearing, and stop the selected
      // seat from appearing green
      this.seat = { row: 0, col: 0 };

      this.showConfirmationMessage = { row: reservation.row, col: reservation.col };

    },

    seatStatus(row, col){
      // Loop over the reservations for this flight, and return an 'occupied' class name
      // if we find this row + col as a reservation; otherwise return 'free'
      // return Math.random() > 0.5 ? 'occupied' : 'free';
      // let found = false;

      // this.flight.reservations.forEach( r => {
      //   if( r.row === row && r.col === col ){
      //     found = true;
      //   }
      // });
      //

      // const found = this.flight.reservations.some( r => r.row === row && r.col === col );
      // return found ? 'occupied' : 'free' ;

      const seatKey = `${row}-${col}`;

      if( seatKey in this.user_reservations ){
        return 'booked';
      } else if( seatKey in this.reservations ){
        return 'occupied';
      } else {
        return 'free';
      }


      // for( let i = 0; i < this.flight.reservations.length; i++ ){
      //   const r = this.flight.reservations[i];
      //
      //   // Does the seat we are currently checking correspond to this reservation 'r'?
      //   if( r.row === row && r.col === col ){
      //
      //     // if( r.user_id === FAKE_CURRENT_USER_ID ){
      //     //   return 'booked';  // This reservation belongs to the logged-in user
      //     // } else {
      //     //   return 'occupied'; // Some rando has booked this seat
      //     // }
      //     return r.user_id === FAKE_CURRENT_USER_ID ? 'booked' : 'occupied';
      //
      //   }
      // } // for
      //
      // return 'free';

    }, // seatStatus

    selectSeat(row, col){
      console.log('selectSeat()', row, col);

      // axios.post('http://localhost:3000/reservations', {
      //     row, col,
      //     user_id: FAKE_CURRENT_USER_ID, // DO NOT DO THIS! Use current_user or similar on the backend
      //     flight_id: this.id  // From the props given by the router, could also use this.flight.id
      //   })
      //   .then(  res => {
      //     console.log('response', res);
      //     this.flight.reservations.push( res.data );
      //   })
      //   .catch( err => console.warn('POST reservation error', err) );

      // this.seat.row = row;
      // this.seat.col = col;
      this.seat = { row, col };  // short for { row: row, col: col }

      this.showConfirmationMessage = {}; // Stop the previous confirmation message from appearing

    }, // selectSeat()

    selectedSeat(row, col){
      return (row === this.seat.row && col === this.seat.col) && 'selected';
    }

  }, // methods

  // Filters are like Rails template helpers, intended just for transforming text in your template
  filters: {
    toSeatLetter( num ){
      return String.fromCharCode( 64 + num );
    }
  }
}
</script>

<style lang="css" scoped>

  .confirmationMessage {
    margin: 20px;
    font-weight: bold;
    color: orange;
  }

  .selected {
    background-color: rgb(100, 255, 37);
    border: 1px solid lime !important;
  }

  .booked {
    background-color: orange;
    pointer-events: none;
  }

  .occupied {
    background-color: grey;
    pointer-events: none; /* Ignore clicks on occupied seats! */
  }

  .seat {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #CCCCCC;
    margin: 4px;
    cursor: pointer;
  }
</style>
