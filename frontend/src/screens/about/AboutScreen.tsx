import * as React from 'react'
import { FaGithub, FaTelegram } from 'react-icons/fa'
import '../../utils/background.css'
import avatar from '/pfp_2.jpg'

const About: React.FC = () => {
	return (
		<div className='background'>
			<div style={styles.container}>
				<div style={styles.card}>
					<div style={styles.header}>
						<img src={avatar} alt='Avatar' style={styles.avatar} />
						<h1>About Weathy</h1>
					</div>
					<p>
						Weathy is a weather application designed to provide accurate weather
						forecasts for users. Built with React and Spring Boot, Weathy offers
						a user-friendly interface and reliable data sourced from trusted
						meteorological services.
					</p>
					<div style={styles.author}>
						<h2>Author</h2>
						<p>Vlad | broklyn | Konovalow</p>
						<div style={styles.socialIcons}>
							<a
								href='https://github.com/bbroklyn'
								target='_blank'
								rel='noreferrer'
							>
								<FaGithub style={styles.icon} />
							</a>
							<a
								href='https://t.me/vladkonovalow'
								target='_blank'
								rel='noreferrer'
							>
								<FaTelegram style={styles.icon} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	card: {
		maxWidth: '600px',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
		backgroundColor: '#fff',
		color: '#333',
		textAlign: 'center',
		position: 'relative',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		width: '80px',
		height: '80px',
		borderRadius: '50%',
		marginRight: '20px',
	},
	author: {
		marginTop: '20px',
	},
	socialIcons: {
		display: 'flex',
		justifyContent: 'center',
	},
	icon: {
		fontSize: '46px',
		color: '#333',
		marginRight: '20px',
	},
}

export default About
