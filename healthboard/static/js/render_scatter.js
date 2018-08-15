
function render_nodes(frame, json_data) {

    // // add graph canvas to the body of page
    // // let svg = d3.select(container_id)
    // //     .append("svg")
    // //         // add id
    // //         .attr("id", "svg-scatter")
    // //         // add responsive svg
    // //         .attr("preserveAspectRatio", "xMinYMin meet")
    // //         .attr("viewBox", "0 0 400 600")
    // //         // add class to make svg responsive
    // //         .classed("svg-content-responsive", true);

    let xscale = frame.xscale,
        yscale = frame.yscale;
    var $chart = d3.select("#scatter-chart")
    // add nodes
    var nodes = $chart.append("g")
        .classed("nodes", true)
        .selectAll("circle")
        .data(json_data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return `translate(${xscale(d[frame.xquery])}, ${yscale(d[frame.yquery])})`;
        });

    // add circles
    nodes.append("circle")
        .attr("class", "node")
        .attr("r", radius)
        .attr("stroke", stroke_color)
        .attr("stroke-width", 1)
        .attr("fill", node_fill_color)
        .attr("opacity", node_fill_opacity)
        .on("mouseover", node_mouseover_handler)
        .on("mouseout", node_mouseout_handler)
        // add tool tip
        .append("title")
        .text(function (d) {
            return `${data_labels[frame.xquery]}: ${d[frame.xquery]}`
                + `\n${data_labels[frame.yquery]}: ${d[frame.yquery]}`
                + `\n${data_labels["state"]}: ${d["state"]}`
        });

    nodes.append("text")
        .classed("node-label", true)
        .attr("dy", ".35em")
        .attr("font-size", node_font_size)
        .attr("fill", node_font_color)
        // .attr("writing-mode", "tb") // set the writing mode
        .style("text-anchor", "middle")
        .text(d => d.abbr)
        // add tool tip
        .append("title")
        .text(function (d) {
            return `${data_labels[frame.xquery]}: ${d[frame.xquery]}`
                + `\n${data_labels[frame.yquery]}: ${d[frame.yquery]}`
                + `\n${data_labels["state"]}: ${d["state"]}`
        });
};

function render_scatter(query) {

    if (query.xquery == null) query.xquery = document.getElementsByClassName("xlabel active")[0].getAttribute("value");
    if (query.yquery == null) query.yquery = document.getElementsByClassName("ylabel active")[0].getAttribute("value");

    console.log(query.xquery, query.yquery);
    d3.json("/data", function (error, json) {
        let frame = render_chart(json, query.xquery, query.yquery);
        render_nodes(frame, json);
    });
};

var query = {"xquery": "poverty", "yquery": "healthcareLow"};
render_scatter(query);
