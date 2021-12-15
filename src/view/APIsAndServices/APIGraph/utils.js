import moment from 'moment';

export const mergeSeriesData = (listDatas, listDataLabels, mergedLabels) => {
    if(mergedLabels == null || mergedLabels == undefined){
        mergedLabels = [];
        for(let item of listDatas){
            mergedLabels = [...mergedLabels, ...item.labels];
        }
        mergedLabels = Array.from(new Set(mergedLabels)).sort();
    }
    
    let datasets = [];
    let listIndex = 0;
    for(let rqData of listDatas){
        let dataLabel = listDataLabels[listIndex++];
        for(let ds of rqData.datasets){
            let index = 0;
            let data = ds.data;
            let labels = rqData.labels;
            ds.data = mergedLabels.map(label => {
                if(labels[index] == label){
                    return data[index++] || 0;
                }
                return 0;
            })
            ds.stack = ds.query_string;
            ds.serie = `${ds.stack}_${dataLabel}`;
            ds.label = dataLabel;
            datasets.push(ds);
        }
    }

    return {
        datasets: datasets,
        labels: mergedLabels,
    }
};


export const getDateSeriesDuration1d = (startDate, endDate) => {
    let s = [];
    let sd = moment(startDate);
    let ed = moment(endDate);
    while(!sd.isAfter(ed)){
        s.push(sd.format('DD-MM-YYYY'));
        sd = sd.add(1, 'days');
    }
    return s;
}