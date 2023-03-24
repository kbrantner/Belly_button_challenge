let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let selectdrop= d3.select('#selDataset');

d3.json(url).then(function (data) {
    console.log("data");
    console.log(data);
    // var bellydata = data.metadata;
    // console.log("bellydata");
    // console.log(bellydata);
    var names = data.names;

    for (let i = 0; i < names.length; i++) {
        selectdrop.append("option").text(names[i]).property("value", names[i]);
    };


    //console.log(names);
    var samples = data.samples;
    console.log(samples);
    //have to create a for loop and selectors to 
    // Sort the data by Greek search results descending
// let sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// // Slice the first 10 objects for plotting
// slicedData = sortedByGreekSearch.slice(0, 10);

    let bellyloop_otuid=[];
    let sample_id=[];
    let sample_values=[];
    let otu_labels=[];


    for (let i = 0; i < samples.length; i++) {
        // Variable to hold current movie in loop
        let sample = samples[i];
        // console.log(sample);
        // console.log(samples);
        //how to sort???
        let samplesort=samples.sort((a, b)=>b.sample_values -a.sample_values);
        // console.log(samplesort);
    
        

        
        bellyloop_otuid.push(sample.otu_ids.slice(0,10));
        sample_id.push(sample.id);
        sample_values.push(sample.sample_values.slice(0,10));
        otu_labels.push(sample.otu_labels.slice(0,10));
    };
    console.log(sample_values);
    console.log(bellyloop_otuid);
//need to find a way to match the id to the value so when first sort value, id is also sorted in same way. 
//then need to slice the data in the bar chart itself, see activity 14.2.7
//dropdown menu    d3.sleect element then loop through

var data_barchart = [
        {
          x: [bellyloop_otuid],
          y: [sample_values],
          type: 'bar',
          orientation: "h",
        }
      ];
      Plotly.newPlot("bar", data_barchart);

    let age=[];
    let bbtype=[];
    let ethnicity=[];
    let gender=[];
    let meta_id=[];
    let location=[];
    let wfreq=[];
    for (let i = 0; i < bellydata.length; i++) {
        // Variable to hold current movie in loop
        let x = bellydata[i];
        age.push(x.age);
        bbtype.push(x.bbtype);
        ethnicity.push(x.ethnicity);
        gender.push(x.ethnicity);
        meta_id.push(x.id);
        location.push(x.location);
        wfreq.push(x.wfreq);
    };
    console.log(age);
    console.log(ethnicity);

    var samplefilter = samples.filter(x=>x.id="1489");
    var sample1=samplefilter[0];
    console.log(sample1);
    var otu_ids=sample1.otu_ids;
    console.log(sample1);

});









