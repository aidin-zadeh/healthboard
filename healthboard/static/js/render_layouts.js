
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


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

function render_pie_chart(element_id, values, labels, hover_text, title=title){
    let data = [{
        values: values,
        labels: labels,
        hovertext: hover_text,
        hoverinfo: {bordercolor: 'black'},
        type: 'pie'
    }];

    //   set up layout for plot

    let layout = {

        legend:{
            orientation: "h" | "v",
            // xanchor:"center",
            // yanchor:"top",
            // y:-0.3, // play with it
            // x:0.5   // play with it
        },
        // width: 675,
        margin:
            {
                top: 10,
                bottom: 10,
                right: 10,
                left: 10
            },
        height: 500,
    };
    Plotly.newPlot(element_id, data, layout);
    document.getElementById(element_id + "-header").innerHTML =
        '<i class="fas fa-chart-area"></i>' + " " + title;
}


function render_bubble_plot(element_id, x, y, text, title) {

    console.log("Response from render_bubble_plot: ","x = ", x, "y = ", y, "text = ", text);

    var trace1 = {
        x: x,
        y: y,
        mode: 'markers',
        marker: {
            colorscale: 'Earth',
            color: x,
            size: y
        },
        text: text,
        type: "scatter"
    };

    var bubData = [trace1];

    var bubLayout = {
        hovermode: 'closest',
        showlegend: false,
        height: 600,
        // width: 1200
        margin:
            {
                top: 10,
                bottom: 10,
                right: 10,
                left: 10
            }

    };
    Plotly.newPlot(element_id, bubData, bubLayout);


    document.getElementById(element_id + "-header").innerHTML =
        '<i class="fas fa-chart-area"></i>' + " " +title;
}


function render_metadata_table(table_id, data, title) {

    let keys = Object.keys(data);
    let $table = document.getElementById(table_id);

    try {
        // delete tbody
        let nm_rows = $table.rows.length;
        for (let i = 1; i < nm_rows; i++) {
            $table.deleteRow(1);
        }
    } catch (e) {

    }


    let $tbody = $table.createTBody();
    for (let i = 0; i < keys.length; i++) {
        let $row = $tbody.insertRow();
        let $elem = $row.insertCell(0)
        $elem.innerHTML = keys[i].capitalize();
        $elem = $row.insertCell(1);
        $elem.innerHTML = data[keys[i]];
    }

    document.getElementById(table_id + "-header").innerHTML =
        '<i class="fas fa-chart-area"></i>' + " " + title;
}

// render washing frequency gauge chart
function render_gauge_chart(element_id, wash_freq, title) {
    // determines level
    let level = wash_freq*20;

    // Trig to calc meter point
    let degrees = 180 - level, radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    let main_path = 'M -.0 -0.025 L .0 0.025 L ',
        path_x = String(x),
        space = ' ',
        path_y = String(y),
        path_end = ' Z';
    let path = main_path.concat(path_x, space, path_y, path_end);

    let data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 15, color:'850000'},
        showlegend: false,
        name: 'Number of Washes',
        // text: washResponse,
        hoverinfo: 'name'
    },
        { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
            rotation: 90,
            text: ['8-9', '6-7', '4-5', '2-3', '0-1', " "],
            textinfo: 'text',
            textposition:'inside',
            marker: {colors:['' +
                '   rgba(14, 127, 0, .5)',
                    'rgba(110, 154, 22, .5)',
                    'rgba(170, 202, 42, .5)',
                    'rgba(202, 209, 95, .5)',
                    'rgba(210, 206, 145, .5)',
                    'rgba(255, 255, 255, 0)']},
            labels: ['8-9', '6-7', '4-5', '2-3', '0-1', " "],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

    let layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        height: 500,
        // width: 600,
        margin: {
            top: 50,
            bottom: 10,
            right: 10,
            left: 10
        },
        xaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot(element_id, data, layout);
    document.getElementById(element_id + "-header").innerHTML =
        '<i class="fas fa-chart-area"></i>' + " " + title;
}

//  render sample id input form
d3.json("/names", function (error, response) {

    if (error) return console.warn(error);
    create_select_options("bb-form-input", response)
});



