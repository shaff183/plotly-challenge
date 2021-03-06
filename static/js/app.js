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

// function that creates a bubble chart
function drawBubbleChart(sampleID) {
    console.log(`drawBubbleChart(${sampleID})`);

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

        // create the trace for the bubble chart
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                opacity: 1
            },
            text: otu_labels
        }

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            xaxis: {title: "OTU IDs"},
            yaxis: {title: "Sample Values"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    })
}

// function that shows the meta data from dataset
function showMetaData(sampleID) {
    console.log(`showMetaData(${sampleID})`);

    // clearing the demographic info so the new sample's info can be appended
    document.getElementById("sample-metadata").innerHTML = "";


    d3.json("./samples.json").then(data => {
        var metaData = data.metadata;
        var resultArray = metaData.filter(s => s.id == sampleID);
        var result = resultArray[0];

        // checking to see if the data is properly being stored
        console.log(result);

        //assigning the information we want extracted from dataset
        var id = result.id;
        var ethnicity = result.ethnicity;
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var wfreq = result.wfreq;
        var info = [id,ethnicity,gender,age,location,bbtype,wfreq];

        // appending new data to a list within the demographic box
        var ul = d3.select("#sample-metadata").append("ul");
        ul.append("li").text(`id: ${id}`);
        ul.append("li").text(`ethnicity: ${ethnicity}`);
        ul.append("li").text(`gender: ${gender}`);
        ul.append("li").text(`age: ${age}`);
        ul.append("li").text(`location: ${location}`);
        ul.append("li").text(`bbtype: ${bbtype}`);
        ul.append("li").text(`wfreq: ${wfreq}`);

    })
}


// event handler for selecting new sample
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    // creating a stub for each graph to update itself based on user selected id
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

        // creating a stub for each graph and metadata
        drawBarGraph(id);
        drawBubbleChart(id);
        showMetaData(id);
    });
}

initDashboard();