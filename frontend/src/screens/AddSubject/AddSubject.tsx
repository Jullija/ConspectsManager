import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Form, FormField, Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { titleFontSize } from '../../utils/sizes';
import { useState } from 'react';
import axios from 'axios';

const AddSubject = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState<string>();
  const handleCancel = () => {
    navigate(pathGenerator.SubjectsList);
  };

  const handleConfrim = async () => {
    //e.preventDefault();
    await axios
      .post(`http://127.0.0.1:8000/courses/`, { name: subjectName, description: 'whatever' })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

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
