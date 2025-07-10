import React, { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, eachDayOfInterval } from 'date-fns';
import { ru } from 'date-fns/locale';
import { houseProjectsService } from '../../services/house-projects.service';
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

// Интерфейсы
interface Report {
  id: number;
  description: string;
  createdAt: string;
  authorId: number;
  projectId: number;
  author: {
    id: number;
    userType: 'executor' | 'client'; // Роль автора
  };
}

interface NewReport {
  description: string;
  date: string;
}

const ConstructionTrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // 21 июня 2025, 02:21 PM +04
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newReport, setNewReport] = useState<NewReport>({
    description: '',
    date: '',
  });

  // Получаем все отчёты
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await houseProjectsService.getReport(parseInt(id));
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Ошибка загрузки отчётов:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [id]);

  // Отфильтрованные отчёты для выбранной даты
  const filteredExecutorReports = reports.filter(
    (r) =>
      r.author.userType === 'executor' &&
      new Date(r.createdAt).toDateString() === selectedDate.toDateString()
  );
  const filteredClientReports = reports.filter(
    (r) =>
      r.author.userType === 'client' &&
      new Date(r.createdAt).toDateString() === selectedDate.toDateString()
  );

  // Добавление отчёта
  const handleAddReport = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await houseProjectsService.createReport(parseInt(id), {
        description: newReport.description,
        date: selectedDate.toISOString(),
      });
      setShowAddForm(false);
      setNewReport({ description: '', date: '' });
      fetchReports(); // Обновим все отчёты
    } catch (error) {
      console.error('Ошибка добавления отчёта:', error);
    }
  };

  // Даты от сегодня до +30 дней
  const currentMonthDates = eachDayOfInterval({
    start: new Date(),
    end: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      return d;
    })(),
  });

  const hasReports = (date: Date) =>
    reports.some((r) => new Date(r.createdAt).toDateString() === date.toDateString());

  return (
    <div
      style={{
        // padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Информация о проекте</IonTitle>
        </IonToolbar>
      </IonHeader>

      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        Трекинг строительства
      </h1>

      {/* График работ — отчёты от исполнителей */}
      <div
        style={{
          border: '1px solid #ddd',
          padding: '15px',
          margin: '20px',
          borderRadius: '8px',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: '10px', color: '#444' }}>График работ</h2>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '10px 0',
            marginBottom: '20px',
            gap: '10px',
          }}
        >
          {currentMonthDates.map((day) => {
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const dayLabel = format(day, 'd MMM', { locale: ru });

            return (
              <div
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                style={{
                  minWidth: '58px',
                  height: '58px',
                  borderRadius: '29px',
                  background: isSelected ? '#fcebea' : '#fff',
                  border: isSelected ? '2px solid #e63946' : '1px solid #ccc',
                  boxShadow: isSelected
                    ? '0 4px 6px rgba(230, 57, 70, 0.3)'
                    : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <div
                  style={{ fontSize: '13px', fontWeight: isSelected ? 600 : 400 }}
                >
                  {dayLabel}
                </div>
                <div
                  style={{ fontSize: '10px', color: '#e63946', marginTop: '3px' }}
                >
                  {hasReports(day) ? '●' : ''}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', color: '#666', marginBottom: '10px' }}>
          Работы на {format(selectedDate, 'd MMMM yyyy г.', { locale: ru })}
        </div>
        {loading ? (
          <p style={{ color: '#666' }}>Загрузка...</p>
        ) : filteredExecutorReports.length > 0 ? (
          filteredExecutorReports.map((report) => (
            <div
              key={report.id}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '8px',
                background: '#fff',
              }}
            >
              <p style={{ margin: '0', color: '#333' }}>{report.description}</p>
              <p
                style={{
                  margin: '5px 0 0',
                  color: '#999',
                  fontSize: '0.9em',
                }}
              >
                Дата: {new Date(report.createdAt).toLocaleDateString('ru')}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: '#666' }}>На эту дату работ нет</p>
        )}
      </div>

      {/* Отчёты — от заказчика */}
      <div
        style={{
          border: '1px solid #ddd',
          padding: '15px',
          margin: '20px',
          borderRadius: '8px',
          background: '#fff',
        }}
      >
        <h2 style={{ marginBottom: '10px', color: '#444' }}>Отчёты</h2>
        {loading ? (
          <p style={{ color: '#666' }}>Загрузка...</p>
        ) : filteredClientReports.length > 0 ? (
          filteredClientReports.map((report) => (
            <div
              key={report.id}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '8px',
                background: '#fff',
              }}
            >
              <p style={{ margin: '0', color: '#333' }}>{report.description}</p>
              <p
                style={{
                  margin: '5px 0 0',
                  color: '#999',
                  fontSize: '0.9em',
                }}
              >
                Дата: {new Date(report.createdAt).toLocaleDateString('ru')}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: '#666' }}>На эту дату отчётов нет</p>
        )}
        <div>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              background: '#e63946',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              marginTop: '20px',
              width: '100%',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Добавить отчёт
          </button>
        </div>
      </div>

      {/* Форма добавления */}
      {showAddForm && (
        <div
          style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '20px',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <form onSubmit={handleAddReport}>
            <textarea
              value={newReport.description}
              onChange={(e) =>
                setNewReport({ ...newReport, description: e.target.value })
              }
              placeholder="Описание отчёта"
              style={{
                width: '100%',
                minHeight: '100px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                padding: '8px',
                fontSize: '1em',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <button
                type="submit"
                style={{
                  background: '#e63946',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  marginTop: '20px',
                  width: '100%',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{
                  padding: '8px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  background: '#fff',
                  flex: 1,
                  color: '#444',
                }}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConstructionTrackingPage;