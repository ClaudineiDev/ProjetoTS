import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import api from '../../services/api';
import './styles.css'
import Select from '../../components/Select';

function TeacherList(){
    
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
    }

    // useEffect(() => {
    //     api.get('classes?week_day=6&subject=Biologia&time=10:00').then(response => {
    //         //console.log(response);
    //         setTeachers(response.data);
    //     })
    // }, []);

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                    name="subject" 
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                    label="Matéria"
                    options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Ciências', label: 'Ciências' },
                        { value: 'Física', label: 'Física' },
                        { value: 'Geografia', label: 'Geografia' },
                        { value: 'Matematica', label: 'Matematica' },
                    ]} />
                    <Select 
                    name="week_day" 
                    value={week_day}
                    onChange={(e) => {setWeek_day(e.target.value)}}
                    label="Dia da semana"
                    options={[
                        { value: '0', label: 'domingo' },
                        { value: '1', label: 'segunada' },
                        { value: '2', label: 'terça' },
                        { value: '3', label: 'quarta' },
                        { value: '4', label: 'quinta' },
                        { value: '5', label: 'sexta' },
                        { value: '6', label: 'sabado' },
                    ]} />
                    <Input 
                        type="time" 
                        name="time" 
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                        label="Hora" />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher)=> {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>;
                })}
                
            </main>
        </div>
    )
}

export default TeacherList;