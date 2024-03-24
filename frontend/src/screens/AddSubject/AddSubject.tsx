import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Form, FormField, Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { titleFontSize } from '../../utils/sizes';
import { useState } from 'react';
import useAddSubject from '../../hooks/addSubject';

const AddSubject = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState<string>();
  const { isLoading, error, addSubject } = useAddSubject();

  const handleCancel = () => {
    navigate(pathGenerator.SubjectsList);
  };

  const handleConfrim = async () => {
    if (subjectName) {
      addSubject(subjectName, 'asd');
      navigate(pathGenerator.SubjectsList);
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
