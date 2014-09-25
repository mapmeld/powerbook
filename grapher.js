var current_index = 0;
var files = ['pwr-CSN74901610-140812_094818.csv', 'pwr-CSN74901610-140812_132323.csv', 'pwr-CSN74901610-140812_194754.csv', 'pwr-CSN74901610-140813_024703.csv', 'pwr-CSN74901610-140813_103642.csv', 'pwr-CSN74901610-140813_140138.csv', 'pwr-CSN74901610-140813_140730.csv', 'pwr-CSN74901610-140813_144345.csv', 'pwr-CSN74901610-140813_163147.csv', 'pwr-CSN74901610-140813_200446.csv', 'pwr-CSN74901610-140813_201351.csv', 'pwr-CSN74901610-140813_201631.csv', 'pwr-CSN74901610-140813_204745.csv', 'pwr-CSN74901610-140814_084549.csv', 'pwr-CSN74901610-140814_092129.csv', 'pwr-CSN74901610-140817_121540.csv', 'pwr-CSN74901610-140817_130817.csv', 'pwr-CSN74901610-140817_144839.csv', 'pwr-CSN74901610-140817_192231.csv', 'pwr-CSN74901610-140818_014105.csv', 'pwr-CSN74901610-140818_120727.csv', 'pwr-CSN74901610-140818_194637.csv', 'pwr-CSN74901610-140819_201423.csv', 'pwr-CSN74901610-140820_141723.csv', 'pwr-CSN74901610-140821_005455.csv', 'pwr-CSN74901610-140821_200413.csv', 'pwr-CSN74901610-140822_112805.csv', 'pwr-CSN74901610-140822_140302.csv', 'pwr-CSN74901610-140822_193639.csv', 'pwr-CSN74901610-140822_201752.csv', 'pwr-CSN74901610-140823_062702.csv', 'pwr-CSN74901610-140823_155440.csv', 'pwr-CSN74901610-140824_064713.csv', 'pwr-CSN74901610-140824_201854.csv', 'pwr-CSN74901610-140825_120103.csv', 'pwr-CSN74901610-140825_143726.csv', 'pwr-CSN74901610-140825_174855.csv', 'pwr-CSN74901610-140825_214631.csv', 'pwr-CSN74901610-140826_170011.csv', 'pwr-CSN74901610-140826_203214.csv', 'pwr-CSN74901610-140826_203638.csv', 'pwr-CSN74901610-140827_002212.csv', 'pwr-CSN74901610-140827_204920.csv', 'pwr-CSN74901610-140828_022748.csv', 'pwr-CSN74901610-140828_201336.csv', 'pwr-CSN74901610-140828_202508.csv', 'pwr-CSN74901610-140829_113304.csv', 'pwr-CSN74901610-140829_200141.csv', 'pwr-CSN74901610-140830_231933.csv', 'pwr-CSN74901610-140831_220806.csv', 'pwr-CSN74901610-140901_062253.csv', 'pwr-CSN74901610-140901_132708.csv', 'pwr-CSN74901610-140901_183507.csv', 'pwr-CSN74901610-140904_213318.csv', 'pwr-CSN74901610-140905_105505.csv', 'pwr-CSN74901610-140906_001006.csv', 'pwr-CSN74901610-140906_085008.csv'];
var initial_file = "pwr-CSN74901610-140820_141723.csv";

showPowerFile(files.indexOf(initial_file));

function showPowerFile(index) {
  current_index = index;
  $("#chart").off().html("");
  $("#current").text(files[index]);
  $.get("power-logs/" + files[index], function(data) {
    var rows = data.split('<StartData>')[1].split("\n");
    var times = [];
    var chargeLevels = [];
    for (var r = 0; r < rows.length; r++) {
      rows[r] = rows[r].split(",");
      if (rows[r].length > 1) {
        var tstamp = new Date(rows[r][0] * 1000);
        times.push(tstamp);
        chargeLevels.push(rows[r][2] * 1);
      }
    }
    c3.generate({
      data: {
        x: 'time',
        columns: [
          ['time'].concat(times),
          ['charge'].concat(chargeLevels)
        ],
        color: "#77e"
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function(x) {
              return x.toString()
            }
          }
        }
      }
    });
  });
}

$(".prev").click(function(e) {
  var index = current_index - 1;
  if (index < 0) {
    index = files.length - 1;
  }
  showPowerFile(index);
});

$(".next").click(function(e) {
  var index = (current_index + 1) % files.length;
  showPowerFile(index);
});
