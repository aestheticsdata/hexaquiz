// usage : hlg.l('blue', 3, 'message', arg);

function EnhancedLog($log) {
    var log = {
        l: _lg
    },
    COLORS = {
        default: [''],
        grey: [
            'background: Gainsboro;      color: black',
            'background: LightGrey;      color: black',
            'background: Silver;         color: black',
            'background: DarkGrey;       color: black',
            'background: Grey;           color: white',
            'background: DimGrey;        color: white',
            'background: LightSlateGrey; color: white',
            'background: SlateGrey;      color: white',
            'background: DarkSlateGrey;  color: white'
        ],
        purple: [
            'background: Lavender;        color: black',
            'background: Thistle;         color: white',
            'background: Plum;            color: white',
            'background: Violet;          color: white',
            'background: Orchid;          color: white',
            'background: Fuchsia;         color: white',
            'background: MediumOrchid;    color: white',
            'background: MediumPurple;    color: white',
            'background: BlueViolet;      color: white',
            'background: DarkViolet;      color: white',
            'background: DarkOrchid;      color: white',
            'background: Purple;          color: white',
            'background: RebeccaPurple;   color: white',
            'background: Indigo;          color: white',
            'background: MediumSlateBlue; color: white',
            'background: SlateBlue;       color: white',
            'background: DarkSlateBllue;  color: white'
        ],
        blue: [
            'background: Cyan;           color: black',
            'background: LightCyan;      color: black',
            'background: PaleTurquoise;  color: black',
            'background: AquaMarine;     color: black',
            'background: Turquoise;      color: black',
            'background: DarkTurquoise;  color: white',
            'background: CadetBlue;      color: white',
            'background: SteelBlue;      color: white',
            'background: LightSteelBlue; color: white',
            'background: PowderBlue;     color: white',
            'background: SkyBlue;        color: white',
            'background: DeepSkyBlue;    color: white',
            'background: DodgerBlue;     color: white',
            'background: RoyalBlue;      color: white',
            'background: Blue;           color: white',
            'background: MediumBlue;     color: white',
            'background: Navy;           color: white',
            'background: MidnightBlue;   color: white'
        ],
        yellow: [
            'background: Gold;                 color: black',
            'background: Yellow;               color: black',
            'background: LightYellow;          color: black',
            'background: LemonChiffon;         color: black',
            'background: LightGoldenrodYellow; color: black',
            'background: PapayaWhip;           color: black',
            'background: Moccasin;             color: black',
            'background: PeachPuff;            color: black',
            'background: PaleGoldenrod;        color: black',
            'background: Khaki;                color: black',
            'background: DarkKhaki;            color: white'
        ],
        red: [
            'background: IndianRed;   color: white',
            'background: LightCoral;  color: black',
            'background: Salmon;      color: black',
            'background: DarkSalmon;  color: black',
            'background: LightSalmon; color: black',
            'background: Crimson;     color: white',
            'background: Red;         color: White',
            'background: FireBrick;   color: white',
            'background: DarkRed;     color: white'
        ],
        green: [
            'background: GreenYellow;       color:black',
            'background: Chartreuse;        color:black',
            'background: LawnGreen;         color:black',
            'background: Lime;              color:black',
            'background: LimeGreen;         color:black',
            'background: PaleGreen;         color:black',
            'background: LightGreen;        color:black',
            'background: MediumSpringGreen; color:black',
            'background: SpringGreen;       color:black',
            'background: MediumSeeGreen;    color:white',
            'background: SeeGreen;          color:white',
            'background: ForestGreen;       color:white',
            'background: DarkGreen;         color:white',
            'background: YellowGreen;       color:white',
            'background: OliveDrab;         color:white',
            'background: Olive;             color:white',
            'background: DarkOliveGreen;    color:white',
            'background: DarkSeaGreen;      color:white',
            'background: LightSeaGreen;     color:white',
            'background: DarkCyan;          color:white'
        ]
    },
    STYLES = {
        default : '',
        small   : 'font-size:8px;  padding: 2px',
        medium  : 'font-size:12px; padding: 2px',
        big     : 'font-size:20px; padding: 2px; font-weight: bold'
    },
    LOOKUPCAT = {
        'blue'   : 'default',
        'grey'   : 'small',
        'purple' : 'medium',
        'yellow' : 'medium',
        'red'    : 'big'
    };

    return log;

//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _lg(cat, level, txt, arg) {
        var style = LOOKUPCAT[cat],
            txt = '%c'+txt;

        // if a level is bigger than the array length, then modulo it
        (COLORS[cat].length<level) && (level = level % COLORS[cat].length);

        $log.debug(txt, COLORS[cat][level]+';'+STYLES[style], arg);
    }
}

angular
    .module('hexaquiz')
    .factory('hlg', EnhancedLog);