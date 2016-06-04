import $ from 'jquery';
import React from 'react';
import ReactDom from 'react-dom';
import {Line as LineChart} from 'react-chartjs';
import {Radar as RadarChart} from 'react-chartjs';


  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
  }

  const styles = {
    graphContainer: {
      border: '1px solid black',
      padding: '15px'
    }
  }



export default class ChartComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mood: {
        labels: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
        datasets: [
          { 
            label: 'Mood TimeLine',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [5, 15, 30, 45, 75, 10, -45, -15, 65, 80]
          }
        ]
      },
      expressions: {
        labels: ['Sadness', 'Disgust', 'Anger', 'Surprise', 'Fear', 'Happiness'],
        datasets: [
          {
            label: 'Expressions',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [10, 15, 10, 20, 35, 10]
          }
        ]
      }
    }   
  }
  
  componentDidMount () {
    console.log('Im here in ReportView ....' , this.props.params.sessionId);
    $.ajax({
      type: 'GET',
      url: '/api/snapshot',
      data: { id: this.props.params.sessionId },
      error: function(request, status, error) {
        console.log(request.responseText)
      },
      success: function(sessionData) {
       console.log(sessionData, "FROM SUCCESS in COMP didmount")
      }
    })
  };

  render() {
    return (
      <div>
        <div style={styles.graphContainer}>
          <h3>Mood Chart</h3>
          <LineChart data={this.state.mood}
            options={options}
            width="600" height="250"/>
        </div>
        <div style={styles.graphContainer}>
          <h3>Expressions Chart</h3>
          <RadarChart data={this.state.expressions}
            options={options}
            width="600" height="250"/>
        </div>
      </div>
    )
  }
}

