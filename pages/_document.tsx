import Document, { Html, Head, Main, NextScript } from 'next/document';
import Meta from '../components/meta/meta';
import Navigation from '../components/navigation/navigation';

export default class AppDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Meta />
                </Head>

                <Navigation class="navigation"/>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
