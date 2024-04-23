import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { getEdition } from '../../api/edition';
import { Edition as Ed } from '../../utils/types';
import { ItemProvider } from '../../context/ItemContext';
import ContentView from './ContentView';
import FolderStructure from './FolderStructure';
import Editbar from './Editbar';
import { ClipboardProvider } from '../../context/ClipboardContext';
import { pathGenerator } from '../../router/paths';

const Edition = () => {
  const navigate = useNavigate();
  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  const [edition, setEdition] = useState<Ed>();
  const [loading, setLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const goBack = () => navigate(pathGenerator.subject(subjectId));
  const accessRights = () => navigate(pathGenerator.AccessRights(subjectId, editionId));

  useEffect(() => {
    setLoading(true);
    const fetchEdition = async () => {
      try {
        const data = await getEdition(subjectId, editionId);
        setEdition(data);
      } catch (error) {
        console.error('Failed to fetch edition:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdition();
  }, [subjectId, editionId, refreshFlag]);

  const handleRefresh = () => setRefreshFlag((prev) => !prev);

  const canEdit = ['owns', 'edit', 'admin'].includes(edition?.user_permission ?? '');

  return (
    <ItemProvider>
      <ClipboardProvider>
        <Container fluid>
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
                <Segment
                  style={{
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 10em)',
                    minHeight: 'calc(30vh)',
                    paddingRight: '1em'
                  }}>
                  {loading ? (
                    <Dimmer active inverted style={{ minHeight: '100px' }}>
                      <Loader>Ładowanie stuktury folderu</Loader>
                    </Dimmer>
                  ) : (
                    edition && <FolderStructure folders={edition.folders || []} />
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column
                width={12}
                style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 10em)' }}>
                <ContentView onChange={handleRefresh} canEdit={canEdit} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </ClipboardProvider>
    </ItemProvider>
  );
};

export default Edition;
