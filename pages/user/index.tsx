import { useQuery, useMutation } from '@apollo/client';
import { GET_LOCALSTATE_QUERY, InitialStateI } from '../../apollo/caching';
import { withApollo } from '../../apollo/withApolloCient';

function Users() {
  const { loading, data, error } = useQuery<InitialStateI>(GET_LOCALSTATE_QUERY);

  return (
    <div>
      <h1>All Users</h1>
        Get Local State  { JSON.stringify({...data})}
    </div>
  )
};

export default withApollo(Users);