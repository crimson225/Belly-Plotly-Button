function plotInfo(id) {
    //read json
        d3.json("samples.json").then(bellydata =>{
            console.log(bellydata)
            var ids = bellydata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  bellydata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  bellydata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        // top 10
            var OTU_top = ( bellydata.samples[0].otu_ids.slice(0, 10)).reverse();
        // otu IDs
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
        // labels
            var labels =  bellydata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
         // bar plot   
            var tracebar = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // data variable
            var bardata = [tracebar];
            // layout
            var layoutbar = {
                title: "Top 10",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    left: 100,
                    right: 100,
                    top: 100,
                    bottom: 30
                }
            };           
        Plotly.newPlot("bar", bardata, layoutbar);
            // bubble chart
            var tracebub = {
                x: bellydata.samples[0].otu_ids,
                y: bellydata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: bellydata.samples[0].sample_values,
                    color: bellydata.samples[0].otu_ids
                },
                text:  bellydata.samples[0].otu_labels
            };
            // layout bubble plot
            var layoutbub = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
            // data variable 
            var databub = [tracebub];
        // create the bubble plot
        Plotly.newPlot("bubble", databub, layoutbub); 
        });
    }  
    // get demographic info
    function demoInfo(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            console.log(metadata)   
          // filter by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");           
           demographicInfo.html("");   
         // append to panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // change event
    function newSelection(id) {
        plotInfo(id);
        demoInfo(id);
    }
    // initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");   
        d3.json("samples.json").then((data)=> {
            console.log(data)   
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            }); 
            //display plots to the page
            plotInfo(data.names[0]);
            demoInfo(data.names[0]);
        });
    }   
    init();