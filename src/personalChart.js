export default {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
    },
    legend: {
        type: 'scroll',
        left: 0,
        bottom: 0,
        // data: [ 'Happy', 'Confused', 'Distraught', 'Surprise', 'Unknown']
    },
    series: [
        {
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            emphasis: {
                label: {
                    show: true,
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                labelLine: {
                    show: false
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            // labelLine: {
            //     show: false
            // },
            data: [
                {value: 335, name: 'Distracted', itemStyle: {color: '#e7b716'}},
                {value: 800, name: 'Focused', itemStyle: {color: '#0e6ad9'}}
            ]
        }
    ]
};
