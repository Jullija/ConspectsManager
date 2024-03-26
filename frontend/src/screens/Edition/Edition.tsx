import { Link, useNavigate, useParams } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Grid } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { getEdition } from '../../api/edition';
import { Edition as Ed } from '../../utils/types';
import { FileProvider } from '../../context/FileContext';
import ContentView from './ContentView';
import FolderStructure from './FolderStructure';
import Editbar from './Editbar';
import { FolderProvider } from '../../context/FolderContext';

const Edition = () => {
  const navigate = useNavigate();

  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  const [edition, setEdition] = useState<Ed>();

  const goBack = () => navigate(pathGenerator.subject(subjectId));
  const accessRights = () => navigate(pathGenerator.AccessRights(subjectId, editionId));

  useEffect(() => {
    const fetchEdition = async () => {
      const data = await getEdition(subjectId, editionId);
      setEdition(data);
    };

    fetchEdition();
  }, []);

  return (
    <FileProvider>
      <FolderProvider>
        <Editbar
          onDelete={() => {
            console.log('Edit action');
          }}
          addFile={() => {
            console.log('Edit action');
          }}
          addFolder={() => {
            console.log('Edit action');
          }}
          uploadFile={() => {
            console.log('Edit action');
          }}
          onCut={() => {
            console.log('Edit action');
          }} // Placeholder functionality
          onCopy={() => {
            console.log('Copy action');
          }} // Placeholder functionality
          onPaste={() => {
            console.log('Paste action');
          }} // Placeholder functionality
          goBack={goBack}
          accessRights={accessRights}
          subjectId={subjectId}
          editionId={editionId}
        />
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              {edition && <FolderStructure folders={edition.folders || []} />}
            </Grid.Column>
            <Grid.Column width={12}>
              <ContentView subjectId={subjectId} edition={edition} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </FolderProvider>
    </FileProvider>
  );
};

export default Edition;
