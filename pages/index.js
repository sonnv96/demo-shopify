import { Layout, Page, EmptyState } from '@shopify/polaris';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';




class Index extends React.Component {
    state = { open: false };
    render() {
        const emptyState = !store.get('ids');
        return (
            <Page>
                 {emptyState ? (
                <Layout>
                    <EmptyState
                        heading="Discount your products temporarily"
                        action={{
                            content: 'Select products',
                            onAction: () => this.setState({ open: true }),
                        }}
                        image={img}
                    >
                        <p>Select products to change their price temporarily.</p>
                    </EmptyState>
                </Layout>
                 ) : (
                <ResourceListWithProducts />
                 )}

            </Page>
        );
    }

    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
        this.setState({ open: false })
        console.log(resources);
        console.log(idsFromResources);
        store.set('ids', idsFromResources);
    };
}

export default Index;