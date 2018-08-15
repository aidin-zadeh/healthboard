var data_labels = {
    "state": "State",
    "abbr": "State Code",
    "poverty": "Poverty (%)",
    "povertyMoe": "Media Poverty (%)",
    "age": "Age (Mean)",
    "ageMoe": "Age (Median)",
    "income": "Household Income (Mean)",
    "incomeMoe": "Household Income (Median)",
    "healthcare": "Healthcare (%)",
    "healthcareLow": "Low Healthcare (%)",
    "healthcareHigh": "High Healthcare (%)",
    "obesity": "Obesity (%)",
    "obesityLow": "Low Obesity (%)",
    "obesityHigh": "High Obesity (%)",
    "smokes": "Somokes (%)",
    "somkesLow": "Smokes Low (%)"
};

var diameter = 100;

var margin = {
    top: 10,
    right: 10,
    bottom: 90,
    left: 90
};

var container_id = "scatter-plot",
    svg_id = "svg-scatter";

var label_font_size = 12,
    radius = 12,
    active_fill_color = "#000000",
    inactive_fill_color = "#999999",
    node_fill_color = "#86cbff",
    node_fill_opacity = 0.8,
    node_font_color = "#ffffff",
    node_font_size = 8,
    stroke_color = "#ffffff";

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function clear_container(element_id) {
    let div = document.getElementById(element_id);
    while(div.firstChild){
        div.removeChild(div.firstChild);
}
}

/**
 *
 * @param form_id
 * @param options
 */
function create_select_options(form_id, options) {
    let $selectForm = document.getElementById(form_id);
    for (let i=0; i<options.length; i++){
        let $elem = document.createElement("option");
        $elem.innerHTML = options[i];
        $selectForm.appendChild($elem);
    }
}


function render_chart(json, xquery, yquery) {

    // add graph canvas to the body of page
    // let svg = d3.select(container_id)
    //     .append("svg")
    //         // add id
    //         .attr("id", "svg-scatter")
    //         // add responsive svg
    //         .attr("preserveAspectRatio", "xMinYMin meet")
    //         .attr("viewBox", "0 0 400 600")
    //         // add class to make svg responsive
    //         .classed("svg-content-responsive", true);

    clear_container(container_id);
    var svg = d3.select("#" + container_id)
        .append("svg")
        .attr("id", svg_id)
        .attr("width", "100%")
        .attr("height", "100%");

    let svg_height = $("#" + svg_id).height(),
        svg_width = $("#" + svg_id).width(),
        chart_width = svg_width - margin.left - margin.right,
        chart_height = svg_height - margin.top - margin.bottom;

    // var svg = d3.select("#svg-scatter-plot"),
    //     aspect =svg.width() /svg.height(),
    //     container = svg.parent();

    // console.log(json[0][xquery])
    // console.log(d3.min(json, function (d) {return d[xquery]}));

    var chart = svg.append("g")
        .attr("id", "scatter-chart")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    var xscale = d3.scaleLinear()
            .range([0, chart_width])
            .domain([
                0.8 * d3.min([0., 0.8 * d3.min(json, function (d) {
                    return +d[xquery]
                })]),
                1.2 * d3.max(json, function (d) {
                    return +d[xquery]
                })
            ]),
        bottom_axis = d3.axisBottom(xscale);

    var yscale = d3.scaleLinear()
            .range([chart_height, 0])
            .domain([
                0.8 * d3.min([0., 0.8 * d3.min(json, function (d) {
                    return +d[yquery]
                })]),
                1.2 * d3.max(json, function (d) {
                    return +d[yquery]
                })
            ]),
        left_axis = d3.axisLeft(yscale);

    // add axes
    chart.append("g")
        .attr("transform", `translate(0, ${chart_height})`)
        .call(bottom_axis);
    chart.append("g")
        .attr("transform", `translate(0, ${0})`)
        .call(left_axis);

    // add x axis labels
    chart.append("text")
        .classed("xlabel", true)
        .classed("active", xquery == "poverty")
        .attr("id", "xlabel-1")
        .attr("value", "poverty")
        .attr("x", chart_width / 2)
        .attr("y", chart_height + margin.bottom / 3 + 0)
        .attr("fill", inactive_fill_color)
        .attr("font-size", label_font_size)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(data_labels["poverty"])
        .on("click", xlabel_1_click_handler);

    chart.append("text")
        .classed("xlabel", true)
        .classed("active", xquery == "age")
        .attr("id", "xlabel-2")
        .attr("x", chart_width / 2)
        .attr("y", chart_height + margin.bottom / 3 + margin.bottom / 4)
        .attr("fill", inactive_fill_color)
        .attr("font-size", label_font_size)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("value", "age")
        .text(data_labels["age"])
        .on("click", xlabel_2_click_handler);

    chart.append("text")
        .classed("xlabel", true)
        .classed("active", xquery == "incomeMoe")
        .attr("id", "xlabel-3")
        .attr("x", chart_width / 2)
        .attr("y", chart_height + margin.bottom / 3 + 2 * margin.bottom / 4)
        .attr("fill", inactive_fill_color)
        .attr("font-size", label_font_size)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("value", "incomeMoe")
        .text(data_labels["incomeMoe"])
        .on("click", xlabel_3_click_handler);

    // add y axis labels
    chart.append("text")
        .classed("ylabel", true)
        .classed("active", yquery == "healthcareLow")
        .attr("value", "healthcareLow")
        .attr("id", "ylabel-1")
        .attr("transform", `translate(${-margin.left / 3},${chart_height / 2})` + "rotate(-90) ")
        .attr("fill", inactive_fill_color)
        .attr("font-size", label_font_size)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(data_labels["healthcareLow"])
        .on("click", ylabel_1_click_handler);

    chart.append("text")
        .classed("ylabel", true)
        .classed("active", yquery === "smokes")
        .attr("id", "ylabel-2")
        .attr("value", "smokes")
        .attr("transform", `translate(${-margin.left / 3 - margin.left / 4},${chart_height / 2})` + "rotate(-90) ")
        .attr("fill", inactive_fill_color)
        .attr("font-size", label_font_size)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(data_labels["smokes"])
        .on("click", ylabel_2_click_handler);

    chart.append("text")
        .classed("ylabel", true)
        .classed("active", yquery === "obesity")
        .attr("id", "ylabel-3")
        .attr("value", "obesity")
        .attr("transform", `translate(${-margin.left / 3 - 2 * margin.left / 4},${chart_height / 2})` + "rotate(-90) ")
        .attr("fill", inactive_fill_color)
        .attr("font-size", label_font_size)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(data_labels["obesity"])
        .on("click", ylabel_3_click_handler);

    document.getElementsByClassName("xlabel active")[0].setAttribute("fill", active_fill_color);
    document.getElementsByClassName("ylabel active")[0].setAttribute("fill", active_fill_color);

    return {
        "xscale": xscale,
        "yscale":yscale,
        "xquery": xquery,
        "yquery": yquery
    };
}

function error_handler(error) {
    throw(error)
}

function node_mouseover_handler(d, i) {
    d3.select(this)
        .transition()
        .duration(500)
        .attr("r", radius*1.3)
        .attr("stroke-width", 3)
        .attr("opacity", 1.0)
}

function node_mouseout_handler(d, i) {
    d3.select(this)
        .transition()
        .duration(500)
        .attr("r", radius)
        .attr("stroke-width", 1)
        .attr("opacity", node_fill_opacity);

}

function xlabel_1_click_handler(d, i) {
    d3.select(this)
       .classed("active", true)
        .attr("fill", active_fill_color);
    d3.select("#xlabel-2")
        .classed("active", false)
        .attr("fill", inactive_fill_color);
    d3.select("#xlabel-3")
        .classed("active", false)
        .attr("fill", inactive_fill_color);
    let xquery = document.getElementsByClassName("xlabel active")[0].getAttribute("value");
    render_scatter({"xquery": xquery, "yquery": null});
}

function xlabel_2_click_handler(d, i) {
    d3.select(this)
        .classed("active", true)
    d3.select("#xlabel-1")
        .classed("active", false)
    d3.select("#xlabel-3")
        .classed("active", false)
    let xquery = document.getElementsByClassName("xlabel active")[0].getAttribute("value");
    render_scatter({"xquery": xquery, "yquery": null});
}

function xlabel_3_click_handler(d, i) {
    d3.select(this)
        .classed("active", true)
    d3.select("#xlabel-1")
        .classed("active", false)
    d3.select("#xlabel-2")
        .classed("active", false)
    let xquery = document.getElementsByClassName("xlabel active")[0].getAttribute("value");
    render_scatter({"xquery": xquery, "yquery": null});
}

function ylabel_1_click_handler(d, i) {
    d3.select(this)
        .classed("active", true)
    d3.select("#ylabel-2")
        .classed("active", false)
    d3.select("#ylabel-3")
        .classed("active", false)
    let yquery = document.getElementsByClassName("ylabel active")[0].getAttribute("value");
    render_scatter({"xquery": null, "yquery": yquery});
}
function ylabel_2_click_handler(d, i) {
    d3.select(this)
        .classed("active", true)
    d3.select("#ylabel-1")
        .classed("active", false)
    d3.select("#ylabel-3")
        .classed("active", false)
    let yquery = document.getElementsByClassName("ylabel active")[0].getAttribute("value");
    render_scatter({"xquery": null, "yquery": yquery});
}

function ylabel_3_click_handler(d, i) {
    d3.select(this)
        .classed("active", true)
    d3.select("#ylabel-1")
        .classed("active", false)
    d3.select("#ylabel-2")
        .classed("active", false)
   let yquery = document.getElementsByClassName("ylabel active")[0].getAttribute("value");
   render_scatter({"xquery": null, "yquery": yquery});
}



