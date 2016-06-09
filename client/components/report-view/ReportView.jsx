import $ from 'jquery';
import React from 'react';
import ReactDom from 'react-dom';
import {Line as LineChart} from 'react-chartjs';
import {Radar as RadarChart} from 'react-chartjs';
import Transcript from './TranscriptView.jsx';
import Notes from './NotesView.jsx';

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
            data: []
          }
        ]
      },
      mood: {
        labels: [],
        datasets: [
          {
            label: 'Mood TimeLine',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: []
          }
        ]
      },
    showTranscript: false,
    showNotes: false
    }
  }

  componentDidMount () {
    $.ajax({
      type: 'GET',
      url: '/api/snapshot',
      data: { sessionId: this.props.params.sessionId },
      error: function(request, status, error) {
        console.error('error while fetching report data', error);
      },
      success: function(sessionData) {
        console.log('____________________________________', sessionData)
        console.log(sessionData);

        var sadness = 0;
        var disgust =0;
        var anger = 0;
        var surprise = 0;
        var fear = 0;
        var happiness = 0;
        var dataLength = sessionData.length;
        var moodLabel = [];
        for (var i=1; i <= dataLength; i++) {
          moodLabel.push(i);
        }
        var moodData = Object.assign({}, this.state.mood);
        var expressionsData = Object.assign({}, this.state.expressions);

        sessionData.forEach(ss => {
          moodData.datasets[0].data.push(ss.mood);
          sadness += ss.sadness;
          disgust += ss.disgust;
          anger += ss.anger;
          surprise += ss.surprise;
          fear += ss.fear;
          happiness += ss.happiness;
        })
        moodData.labels = moodLabel;
        expressionsData.datasets[0].data = [Math.floor(sadness/dataLength), Math.floor(disgust/dataLength), Math.floor(anger/dataLength),
          Math.floor(surprise/dataLength), Math.floor(fear/dataLength), Math.floor(happiness/dataLength)];
          this.setState({expressions: expressionsData, mood: moodData});

          console.log(this.state);
      }.bind(this)
    })
  };

  toggleTranscriptView(){
    if(this.state.showTranscript){
      this.setState({
        showTranscript: false
      })
    } else {
      this.setState({
        showTranscript: true
      })
    }
  }

  toggleNotesView(){
    if(this.state.showNotes){
      this.setState({
        showNotes: false
      })
    } else {
      this.setState({
        showNotes: true
      })
    }
  }

  render() {
    return (
      <div>
        <div>
          <span><button onClick={this.toggleTranscriptView.bind(this)} >Transcript</button></span>
          <span><button onClick={this.toggleNotesView.bind(this)}>Notes</button></span>
        </div>
        <div>
          { this.state.showTranscript ?  <Transcript /> : null}
        </div>
        <div>
          { this.state.showNotes ?  <Notes /> : null}
        </div>
        <div style={styles.graphContainer}>
          <h3>Mood Chart</h3>
          <LineChart data={this.state.mood}
            redraw options={options}
            width="600" height="250"/>
        </div>
        <div style={styles.graphContainer}>
          <h3>Expressions Chart</h3>
          <RadarChart data={this.state.expressions}
            redraw options={options}
            width="600" height="250"/>
        </div>
      </div>
    )
  }
}

