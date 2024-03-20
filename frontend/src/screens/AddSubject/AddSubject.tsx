import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Form, FormField, Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { titleFontSize } from '../../utils/sizes';
import { useState } from 'react';

const AddSubject = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState<string>();
  const handleCancel = () => {
    navigate(pathGenerator.SubjectsList);
  };

  const handleConfrim = () => {
    navigate(pathGenerator.SubjectsList);
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
            type="submit"
            onClick={handleConfrim}
            style={{ backgroundColor: colors.darkblue, color: colors.white }}>
            dodaj
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddSubject;
