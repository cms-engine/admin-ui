import React from 'react'
import styles from './Card.module.css'

type CardProps = {
  title: string
  type: 'primary' | 'warning' | 'danger' | 'success'
}

/**
 * Card component for displaying a styled card with a title and action link.
 *
 * This component renders a single card styled based on the `type` prop.
 * Each card includes:
 * - A title.
 * - A button link for additional actions (e.g., "View details").
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title displayed on the card.
 * @param {'primary' | 'warning' | 'danger' | 'success'} props.type - The style type of the card, which determines its appearance.
 * @returns {React.ReactElement} The rendered Card component.
 */

const Card: React.FC<CardProps> = ({ title, type }) => {
  return (
    <div className={`${styles.dashboardCard} card-${type}`}>
      <div className='card-body'>
        <h5>{title}</h5>
        <a href='#' className='btn btn-light btn-sm'>
          View details
        </a>
      </div>
    </div>
  )
}

export default Card
