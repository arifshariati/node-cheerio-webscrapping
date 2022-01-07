const request = require('request-promise');
const cheerio = require('cheerio');


const webLink = "https://www.imdb.com/title/tt11286314/?ref_=nv_sr_srsg_0";

(async () => {

    let imdbData = [];

    // make request to the webLink
    // remember you have to include headers so target resource does not block the request
    const response = await request({
        uri: webLink,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,tr;q=0.8"
        },
        gzip: true
    });

    // here cheeio helps you dump everything inside $
    let $ = cheerio.load(response);

    // These selector are subject to region and imdb website update
    let title = $('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text().trim();
    let rating = $('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').text().trim();
    let summary = $('span[class="GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0 dcFkRD"]').text().trim();
    let releaseDate = $('a[class="ipc-link ipc-link--baseAlt ipc-link--inherit-color TitleBlockMetaData__StyledTextLink-sc-12ein40-1 rgaOW"]').text().substring(0,4);

    // till here you have all data you would require and onwards depends whether you want to write to a file or a db
    imdbData.push({ title, rating, releaseDate, summary });
    
    console.log(imdbData);

})();