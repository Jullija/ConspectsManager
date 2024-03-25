import { Link, useParams } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Grid } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { getEdition } from '../../api/edition';
import { Edition as Ed } from '../../utils/types';
import { FileProvider } from '../../context/FileContext';
import ContentView from './ContentView';
import FolderStructure from './FolderStructure';
import Editbar from './Editbar';

const Edition = () => {
  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  const [edition, setEdition] = useState<Ed>();

  useEffect(() => {
    const fetchEdition = async () => {
      const data = await getEdition(subjectId, editionId);
      setEdition(data);
    };

    fetchEdition();
  }, []);

  return (
    <FileProvider>
      <Editbar
        onEdit={function (): void {
          throw new Error('Function not implemented.');
        }}
        onCopy={function (): void {
          throw new Error('Function not implemented.');
        }}
        onPaste={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <FolderStructure folders={edition?.folders || []} />
          </Grid.Column>
          <Grid.Column width={12}>
            <ContentView subjectId={subjectId} edition={edition} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <p>
        Edition subjectId: {subjectId} editionId: {editionId}
      </p>
      <Link to={pathGenerator.subject(subjectId)}>
        <button>Go back to subject</button>
      </Link>
      <Link to={pathGenerator.AccessRights(subjectId, editionId)}>
        <button>Access rights</button>
      </Link>
    </FileProvider>
  );
};

export default Edition;
