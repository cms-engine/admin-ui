import React from 'react'
import Card from './Card'
import styles from './CardContainer.module.css'
/**
 * CardContainer component for displaying a collection of cards.
 *
 * This component renders a container with multiple `Card` components, each styled differently
 * based on their respective `type` prop. The `CardContainer` groups and visually organizes
 * these cards in a styled layout.
 *
 * @component
 * @returns {React.ReactElement} The rendered CardContainer component.
 */
const CardContainer: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <Card title='Primary Card' type='primary'></Card>
      <Card title='Warning Card' type='warning'></Card>
      <Card title='Success Card' type='success'></Card>
      <Card title='Danger Card' type='danger'></Card>
    </div>
  )
}

export default CardContainer
