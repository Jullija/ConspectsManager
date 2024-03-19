import { useNavigate } from 'react-router-dom';
import { Subject } from '../../utils/types';
import { pathGenerator } from '../../router/paths';
import { colors } from '../../utils/colors';
import { useState } from 'react';

interface SubjectCardProps {
  subject: Subject;
}
const SubjectCard = ({ subject }: SubjectCardProps) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={() => navigate(pathGenerator.subject(subject.id))}
      style={{
        border: colors.grey,
        padding: 40,
        backgroundColor: isFocused ? colors.orange : colors.white,
        color: isFocused ? colors.white : colors.darkblue,
        cursor: 'pointer',
        borderRadius: 8
      }}
    >
      {subject.name}
    </div>
  );
};

export default SubjectCard;
