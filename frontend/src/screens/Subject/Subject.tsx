import { useNavigate, useParams } from 'react-router-dom';
import EditionCard from './EditionCard';
import { pathGenerator } from '../../router/paths';
import { titleFontSize } from '../../utils/sizes';
import { Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { getEditions, deleteEdition } from '../../api/editions';
import { useQuery } from 'react-query';
import axios from 'axios';
import ConfiramtionModal from '../../components/ConfirmationModal';
import { useState } from 'react';

const Subject = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: editions,
    refetch
  } = useQuery('editions', () => getEditions(subjectId));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    navigate(pathGenerator.ErrorPage('something went wrong'));
  }

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [editionIdToDelete, setEditionIdToDelete] = useState<number>(-1);

  const handleDeleteEdition = async (editionId: number) => {
    try {
      await deleteEdition(subjectId, editionId);
      refetch();
    } catch (error) {
      navigate(
        pathGenerator.ErrorPage(
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data)
            : 'Something went wrong :('
        )
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '24px 20px'
        }}>
        <div style={{ fontSize: titleFontSize }}>subject subjectId: {subjectId}</div>
        <Button
          style={{ backgroundColor: colors.blue, color: colors.white }}
          onClick={() => navigate(pathGenerator.AddEdition(subjectId))}>
          add edition
        </Button>
      </div>
      {editions?.map((edition, index) => (
        <EditionCard
          key={index}
          edition={edition}
          subjectId={subjectId}
          withBottomBorder={index !== editions.length - 1}
          handleDeleteClick={() => {
            setEditionIdToDelete(edition.id);
            setShowConfirmationModal(true);
          }}
        />
      ))}
      <ConfiramtionModal
        open={showConfirmationModal}
        onCloseClick={() => setShowConfirmationModal(false)}
        onConfirmClick={async () => {
          await handleDeleteEdition(editionIdToDelete);
          setShowConfirmationModal(false);
        }}
      />
    </div>
  );
};

export default Subject;
