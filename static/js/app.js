// seeing if app.js has loaded in window
console.log("app.js has loaded");

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

        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);

        var barData = {
            x: sample_values.slice(0, 10),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10),
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