async function populateFormMethod(id_int) {
    try {

        const data = await fetchDataByIdMethod(id_int);


        document.getElementById('partner_name').value = data.CompanyName || '';
        document.getElementById('company_phone').value = data.CompanyPhone || ''; 
        document.getElementById('street_address').value = data.StreetAddress || ''; 
        document.getElementById('city').value = data.City || '';
        document.getElementById('state').value = data.State || '';
        document.getElementById('zip').value = data.ZIPCode || '';
        document.getElementById('product_description').value = data.ProductDescription || '';
        document.getElementById('contact_name').value = data.ContactName || '';
        document.getElementById('contact_title').value = data.ContactTitle || '';
        document.getElementById('contact_phone').value = data.ContactPhone || '';
        document.getElementById('contact_email').value = data.ContactEmail || '';
        document.getElementById('pay_rate').value = data.PayRate || '';

        // checkbox fields
        document.getElementById('fullTime').checked = data.FullTime == 1;
        document.getElementById('partTime').checked = data.PartTime == 1;
        document.getElementById('medical').checked = data.Medical == 1;
        document.getElementById('dental').checked = data.Dental == 1;
        document.getElementById('retirement').checked = data.RetirementPlan == 1;
        document.getElementById('paidTimeOff').checked = data.PaidTimeOff == 1;
        document.getElementById('tig').checked = data.TIG == 1;
        document.getElementById('spray_transfer').checked = data.SprayTransfer == 1;
        document.getElementById('short_circuit').checked = data.ShortCircuit == 1;
        document.getElementById('flux_core').checked = data.FluxCore == 1;
        document.getElementById('stick').checked = data.Stick == 1;
        document.getElementById('other').checked = data.Other == 1;
        document.getElementById('firstShift').checked = data.FirstShift == 1;
        document.getElementById('secondShift').checked = data.SecondShift == 1;
        document.getElementById('thirdShift').checked = data.ThirdShift == 1;
        document.getElementById('weldTest_description').value = data.WeldTestDescription || '';
        document.getElementById('notes').value = data.Notes || '';

    } 
    catch (error) {
        console.error('Error fetching data:', error); // log any errors that occur fetching data
        // handle the error (e.g., show an error message)
    }
}
