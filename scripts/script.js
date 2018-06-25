const parties = {
  liberal: {
    name: 'Liberal',
    shortName: 'Lib.',
    color: '#D71B1E',
    colorLight: '#E77678',
    key: '1'
  },
  conservative: {
    name: 'Conservative',
    shortName: 'Con.',
    color: '#0C499C',
    colorLight: '#6D92C4',
    key: '2'
  },
  ndp: {
    name: 'New Democratic',
    shortName: 'NDP',
    color: '#F37021',
    colorLight: '#F8A97A',
    key: '3'
  },
  bq: {
    name: 'Bloc Québécois',
    shortName: 'Bloc',
    color: '#093C71',
    colorLight: '#6B8AAA',
    key: '4'
  },
  green: {
    name: 'Green',
    shortName: 'Green',
    color: '#3D9B35',
    colorLight: '#8BC386',
    key: '5'
  }
}



const elections = [
  {
    year: 2015,
    results: [
      {
        leader: 'Justin Trudeau',
        party: parties.liberal,
        votePercent: 40,
        seatPercent: 54,
        seats: 184
      },
      {
        leader: 'Stephen Harper' ,
        party: parties.conservative,
        votePercent: 42 ,
        seatPercent: 39,
        seats: 99
      },
      {
        leader: 'Thomas Mulcair' ,
        party: parties.ndp,
        votePercent: 20,
        seatPercent: 13,
        seats: 44
      },
      {
        leader: 'Gilles Duceppe' ,
        party: parties.bq,
        votePercent: 4.7,
        seatPercent: 3,
        seats: 10
      },
      {
        leader: 'Elizabeth May',
        party: parties.green,
        votePercent: 3.4,
        seatPercent: 0.3,
        seats: 1
      }
    ]
  },
  {
    year: 2011,
    results: [
      {
        leader: 'Stephen Harper' ,
        party: parties.conservative,
        votePercent: 40 ,
        seatPercent: 54,
        seats: 166
      },
      {
        leader: 'Jack Layton' ,
        party: parties.ndp,
        votePercent: 31,
        seatPercent: 33,
        seats: 103
      },
      {
        leader: 'Michael Ignatieff',
        party: parties.liberal,
        votePercent: 19,
        seatPercent: 11,
        seats: 34
      },
      {
        leader: 'Gilles Duceppe' ,
        party: parties.bq,
        votePercent: 6,
        seatPercent: 1,
        seats: 4
      },
      {
        leader: 'Elizabeth May',
        party: parties.green,
        votePercent: 4,
        seatPercent: 0.3,
        seats: 1
      }
    ]
  },
  {
    year: 2008,
    results: [
      {
        leader: 'Stephen Harper' ,
        party: parties.conservative,
        votePercent: 38,
        seatPercent: 46,
        seats: 143
      },
      {
        leader: 'Stéphane Dion',
        party: parties.liberal,
        votePercent: 26,
        seatPercent: 25,
        seats: 77
      },
      {
        leader: 'Jack Layton' ,
        party: parties.ndp,
        votePercent: 18,
        seatPercent: 12,
        seats: 37
      },
      {
        leader: 'Gilles Duceppe' ,
        party: parties.bq,
        votePercent: 26,
        seatPercent: 16,
        seats: 49
      }
    ]
  },
  {
    year: 2006,
    results: [
      {
        leader: 'Stephen Harper' ,
        party: parties.conservative,
        votePercent: 36,
        seatPercent: 40,
        seats: 124
      },
      {
        leader: 'Paul Martin',
        party: parties.liberal,
        votePercent: 30,
        seatPercent: 33,
        seats: 103
      },
      {
        leader: 'Gilles Duceppe' ,
        party: parties.bq,
        votePercent: 10,
        seatPercent: 17,
        seats: 51
      },
      {
        leader: 'Jack Layton' ,
        party: parties.ndp,
        votePercent: 17,
        seatPercent: 9,
        seats: 29
      }
    ]
  }
 ]

const keyFn = (d) => d.party.key;
const barWidth = () => 1000 / currentData.length / 2 - xGap;

let scale = 7;
let dataIndex = 0;
let  currentData = elections[dataIndex].results;
let currentYear = elections[dataIndex].year;
let xGap = (currentData.length === 4) ? 60 : 40;
let yGap = 80;


d3.select('.prevElection').text(elections[dataIndex + 1].year);
d3.select('.nextElection').classed('hide', true) ;


d3.select(".chart svg")
  .append("g")
    .attr("class", "percentSeatsBars")
    .selectAll("rect")
    .data(currentData, keyFn)
    .enter().append("rect")
    .attr('height', (d) => (d.seatPercent * scale) + 'px' )
    .attr('width',  barWidth() + 'px' )
    .attr('fill', (d) => d.party.color)
    .attr('x', (d, i) => (100 + i * (barWidth() * 2 + xGap) ) + 'px'  )
    .attr('y', (d) => (400 - d.seatPercent *  scale) + 'px' )


d3.select(".chart svg")
.append("g")
  .attr("class", "popularVoteBars")
  .selectAll("rect")
  .data(currentData, keyFn)
  .enter().append("rect")
  .attr('height', (d) => (d.votePercent * scale) + 'px' )
  .attr('width',  barWidth() + 'px' )
  .attr('fill', (d) => d.party.colorLight)
  .attr('x', (d, i) => (100 + barWidth() +  i * (barWidth() * 2 + xGap) ) + 'px'  )
  .attr('y', (d) => (400 - d.votePercent *  scale) + 'px' );

//Add groups
let circlesGroup = d3.select(".chart svg")
.append("g")
  .attr("class", "circles")
  .selectAll("g")
  .data(currentData, keyFn)
  .enter().append("g");

  //Making this a function saves having to repeat the code in the update chart function
  let addCircles = () => {

    //Add the first circle to each group. Depending on which of votes of seats is higher.

  circlesGroup.style('opacity', '0').append('circle')
  .classed('voteCircle', (d) => (d.seatPercent > d.votePercent) ? false : true)
  .classed('seatCircle', (d) => (d.seatPercent > d.votePercent) ? true : false)
  .attr('cx', (d, i) => (100 + barWidth() +  i * (barWidth() * 2 + xGap) ) + 'px'  )
  .attr('cy', (d) => {
    if (d.seatPercent > d.votePercent) {
      const rDiff = d.seatPercent / d.votePercent *  barWidth() - barWidth();
      return ( (400 + barWidth() + yGap ) + rDiff + 2)  + 'px'
    } else {
      return (400 + barWidth() + yGap ) + 'px'
    }
  })
    .attr('r', (d) => {
      if (d.seatPercent > d.votePercent) {
        return d.seatPercent / d.votePercent *  barWidth()  + 'px';
      } else {
        return barWidth() + 'px';
      }
    })
    .attr('fill', (d) => {
      if (d.seatPercent > d.votePercent) {return d.party.color}
      else {return d.party.colorLight}
    })
    .attr('stroke', (d) => {
      if (d.seatPercent > d.votePercent) {return 'none'}
      else {return 'black'}
    })
    ;

  //Add the second circle to each group. Depending on which of votes of seats is higher.
  circlesGroup.insert('circle')
    .classed('voteCircle', (d) => (d.seatPercent < d.votePercent) ? false : true)
    .classed('seatCircle', (d) => (d.seatPercent < d.votePercent) ? true : false)
    .attr('cx', (d, i) => (100 + barWidth() +  i * (barWidth() * 2 + xGap) ) + 'px'  )
    .attr('cy', (d) => {
      if (d.seatPercent > d.votePercent) {
        return (400 + barWidth() + yGap ) + 'px'
      } else {
        const rDiff = d.seatPercent / d.votePercent *  barWidth() - barWidth();
        return ( (400 + barWidth() + yGap ) + rDiff + 2)  + 'px'
      }
    })
    .attr('r', (d) => {
      if (d.seatPercent > d.votePercent) {
        return barWidth() + 'px';
      } else {
        return d.seatPercent / d.votePercent *  barWidth()  + 'px';
      }
    })
    .attr('fill', (d) => {
      if (d.seatPercent > d.votePercent) {return d.party.colorLight}
      else {return d.party.color}
    })
    .attr('stroke', (d) => {
      if (d.seatPercent > d.votePercent) {return 'black'}
      else {return 'none'}
    })
    ;

    circlesGroup.transition().duration(200).style('opacity', '1');
}//End of Add circles function

addCircles();

//Add labels for parties
  d3.select(".chart svg")
  .append("g")
    .attr("class", "partyLabels")
    .selectAll("text")
    .data(currentData, keyFn)
    .enter().append("text")
    .text(d => d.party.shortName )
    .attr('x', (d, i) => (100 + i * (barWidth() * 2 + xGap) ) + 'px'  )
    .attr('y', (d) => (415 + (yGap / 2) ) + 'px' )

  const bottomLabelPosition = () => {
    d3.select('.bottomLabel text:first-child')
    .attr('y', (580 + 2 * barWidth()) + 'px' )
    d3.select('.bottomLabel text:nth-child(2)')
    .attr('y', (610 + 2 * barWidth()) + 'px' )
  }

  bottomLabelPosition();

  //FUNCTION TO UPDATE THE CHART
  const updateChart = () => {
    currentData = elections[dataIndex].results;
    currentYear = elections[dataIndex].year;
    xGap = (currentData.length === 4) ? 60 : 40;
    d3.select('.yearLabel').text(currentYear +  ' Federal Election');


    const seatBars = d3.select('.percentSeatsBars')
      .selectAll("rect")
      .data(currentData, keyFn);

    const voteBars = d3.select('.popularVoteBars')
    .selectAll("rect")
    .data(currentData, keyFn);

    seatBars
      .exit().transition()
      .duration(500)
      .attr('height','0')
      .attr('y', '400px')
      .remove();

    seatBars
      .enter().append('rect');

    d3.select('.percentSeatsBars')
    .selectAll("rect")
      .data(currentData, keyFn)
      .attr('fill', (d) => d.party.color)
      .transition()
      .attr('height', (d) => (d.seatPercent * scale) + 'px' )
      .attr('width',  barWidth() + 'px' )
      .attr('x', (d, i) => (100 + i * (barWidth() * 2 + xGap) ) + 'px'  )
      .attr('y', (d) => (400 - d.seatPercent *  scale) + 'px' );

    voteBars
      .exit().transition()
      .duration(500)
      .attr('height','0')
      .attr('y', '400px')
      .remove();

    voteBars
    .enter().append('rect');

    d3.select('.popularVoteBars')
    .selectAll("rect")
      .data(currentData, keyFn)
      .attr('fill', (d) => d.party.colorLight)
      .transition().duration(500)
      .attr('height', (d) => (d.votePercent * scale) + 'px' )
      .attr('width',  barWidth() + 'px' )
      .attr('x', (d, i) => (100 + barWidth() +  i * (barWidth() * 2 + xGap) ) + 'px'  )
      .attr('y', (d) => (400 - d.votePercent *  scale) + 'px' );

    d3.select('.circles').selectAll('g')
    .transition().duration(100)
    .style('opacity', '0')
    .remove()
    ;

    setTimeout(() => {
      //Select groups inside the circles group, this updates the circlesGroup variable
      circlesGroup = d3.select('.circles')
      .selectAll('g')
      .data(currentData, keyFn)
      .enter().append("g");
      //Run the code from above to add new circles
      addCircles();
    }, 130);

    //Exit Labels
    d3.select(".partyLabels")
      .selectAll("text")
      .data(currentData, keyFn)
      .exit().transition().duration(250).style('opacity', '0');

    //Enter Labels
    d3.select(".partyLabels")
      .selectAll("text")
      .data(currentData, keyFn)
      .enter().append("text")
      .style('opacity', '1')
      .text(d => d.party.shortName )
      .attr('x', (d, i) => (100 + i * (barWidth() * 2 + xGap) ) + 'px'  )
      .attr('y', (d) => (415 + (yGap / 2) ) + 'px' )



    //Update Labels
    d3.select(".partyLabels")
    .selectAll("text")
    .data(currentData, keyFn)
    .transition().duration(500)
    .attr('x', (d, i) => (100 + i * (barWidth() * 2 + xGap) ) + 'px'  )
    .attr('y', (d) => (415 + (yGap / 2) ) + 'px' )
    .style('opacity', '1')

    bottomLabelPosition();



  }//End of Update Chart Function


  d3.select('.prevElection')
    .on('click', () => {
      dataIndex += 1;

      if (dataIndex < elections.length - 1) {
        d3.select('.prevElection').text(elections[dataIndex + 1].year);
      } else {
        d3.select('.prevElection').classed('hide', true);
      }
      d3.select('.nextElection').text(elections[dataIndex - 1].year);
      d3.select('.nextElection').classed('hide', false);
      updateChart();
    })
  d3.select('.nextElection')
    .on('click', () => {
      dataIndex -= 1;

      if (dataIndex > 0) {
        d3.select('.nextElection').text(elections[dataIndex - 1].year);
      } else {
        d3.select('.nextElection').classed('hide', true);
      }
      d3.select('.prevElection').text(elections[dataIndex + 1].year);
      d3.select('.prevElection').classed('hide', false);
      updateChart();
    });
