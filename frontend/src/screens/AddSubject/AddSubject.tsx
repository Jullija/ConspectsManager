import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Form, FormField, Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { titleFontSize } from '../../utils/sizes';
import { useState } from 'react';
import { addSubject } from '../../api/subjects';
import axios from 'axios';

const AddSubject = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState<string>();

  const handleCancel = () => {
    navigate(pathGenerator.SubjectsList);
  };

  const handleConfrim = async () => {
    if (subjectName) {
      try {
        // TODO: add description
        await addSubject(subjectName, 'asd');
        navigate(pathGenerator.SubjectsList);
      } catch (error) {
        navigate(
          pathGenerator.ErrorPage(
            axios.isAxiosError(error)
              ? JSON.stringify(error.response?.data)
              : 'Something went wrong :('
          )
        );
      }
    }
  };

  return (
    <div style={{ color: colors.darkblue }}>
      <div style={{ fontSize: titleFontSize, margin: '24px 20px' }}>Utwórz przedmiot</div>
      <Form style={{ width: 400 }}>
        <FormField>
          <label>Nazwa</label>
          <input placeholder="Nazwa przedmiotu" onChange={(e) => setSubjectName(e.target.value)} />
        </FormField>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button onClick={handleCancel} style={{ backgroundColor: colors.grey }}>
            anuluj
          </Button>
          <Button
            onClick={handleConfrim}
            style={{ backgroundColor: colors.darkblue, color: colors.white }}
            disabled={subjectName === undefined || subjectName === ''}>
            dodaj
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddSubject;
