import { ChartOptions, TooltipItem } from "chart.js";

const optionsBar = (tittleY:string,textTooltip:string): ChartOptions<'bar'>=> {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label} : ${tooltipItem.formattedValue}${textTooltip}`;
                },
              },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            
            },
        y: {
                beginAtZero: true,
            title: {
                display: true,
                text: tittleY,
            },
            },
        },
    }
};

const optionsPie = (textTooltip:string): ChartOptions<'pie'>=>{
    return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start', 
            labels: {
                padding: 10, 
                boxWidth: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.label}: ${tooltipItem.formattedValue}${textTooltip}`;
              },
            },
          },
        },
    }
};

const optionsPolarArea: ChartOptions<'polarArea' > = {
    plugins: {
        legend: {
            position: 'bottom',
          },
        tooltip: {
            callbacks: {
            label: (tooltipItem: TooltipItem<'polarArea'>) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw; 
                
                return `${label}: ${value}%`;
            }
            }
        }
    }
};

const optionsBarCustomize = (tittleX:string,tittleY:string, scaleFormat:string[]): ChartOptions<'bar'>=> {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: false, 
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: tittleX,
                  },
            },
            y: {
                type: 'category',  
                labels: scaleFormat,  
                title: {
                  display: true,
                  text: tittleY,
                },
            },
        },
    }
};

export { optionsBar, optionsPie, optionsPolarArea, optionsBarCustomize };