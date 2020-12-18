
import { useRouter } from "next/router";
import { useCountryLazyQuery } from '../../__generated__/v1/typescript_operations';
import { withApollo } from '../../apollo/withApolloCient';

function Country() {
  const router = useRouter();
  const { query: { countryId } } = router;
  const slugStr = countryId.toString().toUpperCase();

  const [loadData, { called, loading, data }] = useCountryLazyQuery({
    variables: {
      code: slugStr
    }
  });

  if (called && loading) return <p>Loading ...</p>
  if (!called) {
    return <button onClick={() => loadData()}>Load greeting</button>
  }
  return (
    <div>
      <h2>Country </h2>
      { JSON.stringify(data)}
    </div>
  )
}

export default withApollo(Country);