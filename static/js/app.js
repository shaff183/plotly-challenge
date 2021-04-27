// seeing if app.js has loaded in window
console.log("app.js loaded");

// function to create a horizontal bar chart from data (pieces of code taken from office hours tutorial)
function drawBarGraph(sampleID) {
    console.log(`drawBarGraph(${sampleID})`);

    //read in the data from samples.json
    d3.json("samples.json").then(data => {
        // displaying the data in the console making sure it is properly read in
        console.log(data);

        // assigning variables to pieces of data from the dataset
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);
    })

}


function drawBubbleChart(sampleID) {
    console.log(`drawBubbleChart(${sampleID})`);
}


function showMetaData(sampleID) {
    console.log(`showMetaData(${sampleID})`);
}


// event handler for selecting new sample
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBarGraph(newSampleId);
    drawBubbleChart(newSampleId);
    showMetaData(newSampleId);
}


// creating initial dashboard from the first sample ID
function initDashboard() {
    console.log("initDashboard()");

    // populate the dropdown
    var select = d3.select("#selDataset");
    d3.json("samples.json").then(function(data) {
        console.log(data);
    
        var sampleNames = data.names;

        sampleNames.forEach(sampleID => {
            select.append("option")
                .text(sampleID)
                .property("value", sampleID);
        });

        var id = sampleNames[0];

        // creating a stub for each graph
        drawBarGraph(id);
        drawBubbleChart(id);
        showMetaData(id);
    });
    // update the bargraph

    // update the bubble chart

    // update the demographic information

}

initDashboard();