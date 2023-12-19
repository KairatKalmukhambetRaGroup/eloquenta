import localFont from 'next/font/local';

const RalewayFont = localFont({
    src: [
        {
            path: "../assets/fonts/raleway/Raleway-VariableFont_wght.ttf",
            style: "normal"
        },
        {
            path: "../assets/fonts/raleway/Raleway-Italic-VariableFont_wght.ttf",
            style: "italic"
        },
    ],
    variable: "---font-raleway"
});

const PlayfairDisplayFont = localFont({
    src: [
        {
            path: "../assets/fonts/playfairdisplay/PlayfairDisplay-VariableFont_wght.ttf",
            style: "normal"
        },
        {
            path: "../assets/fonts/playfairdisplay/PlayfairDisplay-Italic-VariableFont_wght.ttf",
            style: "italic"
        }
    ],
    variable: '---font-playfair-display'
});

export { PlayfairDisplayFont, RalewayFont };