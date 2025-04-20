function initializePayPalButton( price_string ) {
    if ( typeof paypal === 'undefined' ) {
      console.error( 'PayPal SDK not loaded yet.' );
      return;
    }
  
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: function ( data, actions ) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: price_string
            }
          }]
        });
      },
      onApprove: function ( data, actions ) {
        return actions.order.capture().then( function ( details ) {
          alert( `Transaction completed by ${details.payer.name.given_name}` );
          document.getElementById( 'register-form' ).submit();
        });
      }
    }).render( '#paypal-button-container' );
  }
  