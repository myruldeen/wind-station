(function () {
    var socket = io();

    var temperature = new DonutChart();
    temperature.setSensorDomain([-6, 50]);
    temperature.setSvgDiv('#donut1');
    temperature.createChart('\u00B0' + "c", "temp");

    var humidity = new DonutChart();
    humidity.setSensorDomain([0, 90]);
    humidity.setSvgDiv('#donut2');
    humidity.createChart('\u0025', "humidity");

    var light = new DonutChart();
    light.setSensorDomain([0, 10]);
    light.setSvgDiv('#donut3');
    light.createChart('', "light");

    var soil1 = new DonutChart();
    soil1.setSensorDomain([0, 1023]);
    soil1.setSvgDiv('#donut4');
    soil1.createChart('', "soil1");

    var soil2 = new DonutChart();
    soil2.setSensorDomain([0, 1023]);
    soil2.setSvgDiv('#donut5');
    soil2.createChart('', "soil2");

    var temp1 = new DonutChart();
    temp1.setSensorDomain([-6, 50]);
    temp1.setSvgDiv('#donut6');
    temp1.createChart('', "temp1");

    var temp2 = new DonutChart();
    temp2.setSensorDomain([-6, 50]);
    temp2.setSvgDiv('#donut7');
    temp2.createChart('', "temp2");


    socket.on("initial-data", function (data) {
        temperature.updateChart(data.temp.current);
        humidity.updateChart(data.humidity.current);
        light.updateChart(data.light.current);
	soil1.updateChart(data.soil1.current);
        soil2.updateChart(data.soil2.current);
	temp1.updateChart(data.temp1.current);
        temp2.updateChart(data.temp2.current);
    });
    socket.on('data', function (data) {
        temperature.updateChart(data.temp.current);
        humidity.updateChart(data.humidity.current);
        light.updateChart(data.light.current);
        soil1.updateChart(data.soil1.current);
        soil2.updateChart(data.soil2.current);
	temp1.updateChart(data.temp1.current);
        temp2.updateChart(data.temp2.current);
    });
})();