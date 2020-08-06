import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://scontent.fvix2-1.fna.fbcdn.net/v/t1.0-9/15181290_1274938989233000_6827837919154649036_n.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=5COtuSHLN0UAX9HdIOE&_nc_ht=scontent.fvix2-1.fna&oh=95d940b8499448d13727322caee1a288&oe=5F4E4D7A" alt="Rosana Rezende" />
        <div>
          <strong>Rosana Rezende</strong>
          <span>React</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        <br /><br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem delectus quod officiis, quisquam a ullam. Excepturi iure perferendis illo error delectus, cupiditate tempora exercitationem quis odio voluptatum reiciendis culpa assumenda!
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
