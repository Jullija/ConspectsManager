import { useNavigate, useParams } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Grid } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { getEdition } from '../../api/edition';
import { Edition as Ed } from '../../utils/types';
import { ItemProvider } from '../../context/ItemContext';
import ContentView from './ContentView';
import FolderStructure from './FolderStructure';
import Editbar from './Editbar';
import { ClipboardProvider } from '../../context/ClipboardContext';

const Edition = () => {
  const navigate = useNavigate();

  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  const [edition, setEdition] = useState<Ed>();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const goBack = () => navigate(pathGenerator.subject(subjectId));
  const accessRights = () => navigate(pathGenerator.AccessRights(subjectId, editionId));

  useEffect(() => {
    const fetchEdition = async () => {
      const data = await getEdition(subjectId, editionId);
      setEdition(data);
    };

    fetchEdition();
  }, [refreshFlag]);

  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag); // Toggle to trigger re-fetch
  };
  const canEdit = ['owns', 'edit', 'admin'].includes(edition?.user_permission ?? '');
  return (
    <ItemProvider>
      <ClipboardProvider>
        <Editbar
          onChange={handleRefresh}
          goBack={goBack}
          accessRights={accessRights}
          subjectId={subjectId}
          editionId={editionId}
          canEdit={canEdit}
          canShare={['owns', 'admin'].includes(edition?.user_permission ?? '')}
        />
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              {edition && <FolderStructure folders={edition.folders || []} />}
            </Grid.Column>
            <Grid.Column width={12}>
              <ContentView onChange={handleRefresh} canEdit={canEdit} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ClipboardProvider>
    </ItemProvider>
  );
};

export default Edition;
