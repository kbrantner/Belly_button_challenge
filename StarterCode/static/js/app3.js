let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let selectdrop = d3.select('#selDataset');
let demodrop = d3.select('#sample-metadata');

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

    metadata(names[0]);

    makecharts(names[0]);

});
function metadata(x) {
    d3.json(url).then(function (data) {
        var bellydata = data.metadata;
        let resultArray = bellydata.filter(y => y.id == x);

        let results = resultArray[0];
        console.log(results);


        demodrop.html("");
        for (x in results) {
            demodrop.append("h6").text(`${x.toUpperCase()}: ${results[x]}`);
        };
    })

};
function makecharts(x) {
    d3.json(url).then(function (data) {
        var samples = data.samples;
        let resultArray = samples.filter(y => y.id == x);

        let results = resultArray[0];
        console.log(results);

        let otu_ids = results.otu_ids;
        let otu_labels = results.otu_labels;
        let sample_values = results.sample_values;

        var data_barchart =
            {
                x: sample_values.slice(0, 10).reverse(),
                y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: "h"
            };


        let barLayout = {
            title: "Top 10 Cultures",
            margin: { t: 50, l: 200 },
        };

        Plotly.newPlot("bar", [data_barchart], barLayout);



        let bubbleChart = 
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Purple Colors",
                }
            }
        ;
        let bubbleLayout = {
            title: "Bacteria Cultures for Each Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Number of Cultures" },
        
        };

        Plotly.newPlot("bubble", [bubbleChart], bubbleLayout);


    });
};




function optionChanged(x) {
    metadata(x);

    makecharts(x);
    d3.json(url).then(function (data) {
        var bellydata = data.metadata;
        let resultslist = bellydata.filter(y => y.id == x);

        let results = resultslist[0];
        console.log(results);

    });
};






// //console.log(names);
// var samples = data.samples;
// console.log(samples);
// //have to create a for loop and selectors to
// // Sort the data by Greek search results descending
// let sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// // Slice the first 10 objects for plotting
// slicedData = sortedByGreekSearch.slice(0, 10);

// let bellyloop_otuid = [];
// let sample_id = [];
// let sample_values = [];
// let otu_labels = [];


// for (let i = 0; i < samples.length; i++) {
//     // Variable to hold current movie in loop
//     let sample = samples[i];
//     // console.log(sample);
//     // console.log(samples);
//     //how to sort???
//     let samplesort = samples.sort((a, b) => b.sample_values - a.sample_values);
//     // console.log(samplesort);




//     bellyloop_otuid.push(sample.otu_ids.slice(0, 10));
//     sample_id.push(sample.id);
//     sample_values.push(sample.sample_values.slice(0, 10));
//     otu_labels.push(sample.otu_labels.slice(0, 10));
// };
// console.log(sample_values);
// console.log(bellyloop_otuid);
// //need to find a way to match the id to the value so when first sort value, id is also sorted in same way.
// //then need to slice the data in the bar chart itself, see activity 14.2.7
// //dropdown menu    d3.sleect element then loop through

// var data_barchart = [
//     {
//         x: [bellyloop_otuid],
//         y: [sample_values],
//         type: 'bar',
//         orientation: "h",
//     }
// ];
// Plotly.newPlot("bar", data_barchart);
// log(sample1);











