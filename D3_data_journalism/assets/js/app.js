// @TODO: YOUR CODE HERE!
// Set up SVG
var svgWidth = 800;
var svgHeight = 600;

var margin = {
    top: 40,
    right: 50,
    bottom: 100,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG Wrapper
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var xAxis = "age";
var yAxis = "obesity";

// Function to update x-scale variable when click on axis label
function xScale(data, xAxis) {
    // Create linear variable
    var xLinearScale = d3.scaleLinear()
    // Create scales
    .domain([d3.min(data, d => d[xAxis]) * 0.8,
    d3.max(data, d => d[xAxis]) * 1.2])
    .range([0, width]);
    return xLinearScale
}

// Function to update y-scale variable when click on axis label
function yScale(data, yAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[yAxis]) * 0.9,
        d3.max(data, d => d[yAxis]) * 1.1])
      .range([height,0]);
  
    return yLinearScale;
  }

  function renderXAxes(newX, xAxis) {
    var bottomAxis = d3.axisBottom(newX);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

// function used for updating yAxis var upon click on axis label
function renderYAxes(newY, yAxis) {
    var leftAxis = d3.axisLeft(newY);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

  // function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newX, xAxis, newY, yAxis) {

    circlesGroup.selectAll("circle").transition()
        .duration(1000)
        .attr("cx", d => newX(d[xAxis]))
        .attr("cy", d => newY(d[yAxis]));
  
    circlesGroup.selectAll("text").transition()
        .duration(1000)
        .attr("x", d => newX(d[xAxis]))
        .attr("y", d => newY(d[yAxis]));
  
    return circlesGroup;
  }